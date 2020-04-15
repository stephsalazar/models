const semver = require('semver');
const { orderedObjectToArray } = require('./common');


module.exports = (conn, TopicSchema) => {
  TopicSchema.virtual('syllabus', {
    ref: 'TopicUnit',
    localField: '_id',
    foreignField: 'topic',
  }).set(function (v) {
    this._syllabus = orderedObjectToArray(v);
  });

  TopicSchema.virtual('premium').get(function () {
    return this.price > 0;
  });

  TopicSchema.post('validate', function (doc, next) {
    if (!this._syllabus) {
      return next();
    }

    return Promise.all(this._syllabus.map((unitData) => {
      const unit = new conn.models.TopicUnit({ ...unitData, topic: doc._id });
      return unit.validate();
    }))
      .then(() => next())
      .catch(next);
  });

  TopicSchema.post('save', function (doc, next) {
    const { TopicUnit } = conn.models;
    const syllabus = this._syllabus;

    if (!syllabus) {
      return next();
    }

    return TopicUnit.remove({ topic: this._id })
      .then(() => Promise.all(syllabus.map(unitData => TopicUnit.create({
        ...unitData,
        topic: this._id,
      }))))
      .then(() => next())
      .catch(next);
  });


  const handleUpdate = function (commandResultOrUpdatedDoc, next) {
    if (
      commandResultOrUpdatedDoc
      && commandResultOrUpdatedDoc.constructor
      && commandResultOrUpdatedDoc.constructor.name === 'CommandResult'
    ) {
      // FIXME: Este handler puede invocarse updates que incluyen uno o más
      // documentos (los que satisfagan la query). Cómo hacemos en los casos donde
      // uno de los documentos no se actualizó correctamente?
      // Sabemos que podemos saber que alguno falló con
      // `commandResult.n !== commandResult.ok`, pero no sabemos cuáles fallaron??
      // console.log(commandResult.result);
    } else {
      // `commandResultOrUpdatedDoc` es el documento actulaizado como resultado
      // del hook de `findOneAndUpdate`!!
    }


    const { Topic, TopicUnit } = conn.models;
    const { syllabus } = this.getUpdate();

    if (!syllabus) {
      return next();
    }

    const parsedSyllabus = orderedObjectToArray(syllabus);

    return Topic.find(this.getQuery())
      .then(topics => Promise.all(
        topics.map(
          topic => TopicUnit.remove({ topic: topic._id })
            .then(() => Promise.all(parsedSyllabus.map(unitData => TopicUnit.create({
              ...unitData,
              topic: topic._id,
            })))),
        ),
      ))
      .then(() => next())
      .catch(next);
  };

  const handleRemove = function (next) {
    const { Topic, TopicUnit } = conn.models;

    if (this instanceof conn.Query) {
      return Topic.find(this.getQuery())
        .then(topics => Promise.all(
          topics.map(topic => TopicUnit.remove({ topic: topic._id })),
        ))
        .then(() => next())
        .catch(next);
    }

    return TopicUnit.remove({ topic: this._id })
      .then(() => next())
      .catch(next);
  };

  TopicSchema.post('update', handleUpdate);
  TopicSchema.post('updateOne', handleUpdate);
  TopicSchema.post('findOneAndUpdate', handleUpdate);
  TopicSchema.post('updateMany', handleUpdate);

  TopicSchema.pre('remove', { query: true, document: true }, handleRemove);
  TopicSchema.pre('deleteMany', { query: true, document: true }, handleRemove);
  TopicSchema.pre('deleteOne', { query: true, document: true }, handleRemove);
  TopicSchema.pre('findOneAndDelete', { query: true, document: true }, handleRemove);


  const Topic = conn.model('Topic', TopicSchema);


  const find = function (slug, stable = true) {
    // eslint-disable-next-line no-shadow
    const getBySlug = slug => this.find({ slug }, 'version')
      .then(versions => versions
        .map(({ version }) => version)
        .filter(version => !stable || version.indexOf('-') === -1)
        .sort((a, b) => {
          if (semver.lt(a, b)) {
            return 1;
          }
          if (semver.gt(a, b)) {
            return -1;
          }
          return 0;
        }))
      .then(sortedVersions => sortedVersions[0])
      .then(version => this.findOne({ slug, version }));

    return (slug)
      ? getBySlug(slug)
      : this.distinct('slug')
        .then(slugs => Promise.all(slugs.map(getBySlug)))
        .then(topics => topics.filter(topic => topic));
  };


  Topic.findStable = function (slug) {
    return find.call(this, slug, true);
  };


  Topic.findLatest = function (slug) {
    return find.call(this, slug, false);
  };


  const populateOpts = {
    path: 'syllabus',
    options: { sort: { order: 1, slug: 1 } },
    populate: {
      path: 'parts',
      options: { sort: { order: 1, slug: 1 } },
    },
  };

  // Topic.find = function (...args) {
  //   return this.find(...args).sort({ slug: 1, version: -1 });
  //   // FIXME: orden de versiones NO DEBE SER LEXICOGRÁFICO
  // };

  // Topic.find({ cohort });
  // Topic.findByCohort(cohort);

  // Topic.findByCohort = function (cohort) {
  //   // ...
  // };

  Topic.findPopulated = function (...args) {
    // FIXME: orden de versiones NO DEBE SER LEXICOGRÁFICO
    return this.find(...args)
      .populate(populateOpts)
      .sort({ slug: 1, version: 1 });
  };

  Topic.findOnePopulated = function (...args) {
    return this.findOne(...args).populate(populateOpts);
  };


  return Topic;
};
