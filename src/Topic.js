const parseSyllabus = v => (
  (Array.isArray(v))
    ? v
    : Object.keys(v)
      .sort((a, b) => {
        if (v[a].order > v[b].order) {
          return 1;
        }
        if (v[a].order < v[b].order) {
          return -1;
        }
        return 0;
      })
      .map(slug => ({ ...v[slug], slug }))
);


module.exports = (conn, TopicSchema) => {
  TopicSchema.virtual('syllabus', {
    ref: 'TopicUnit',
    localField: '_id',
    foreignField: 'topic',
  }).set(function (v) {
    this._syllabus = parseSyllabus(v);
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
    if (commandResultOrUpdatedDoc.constructor && commandResultOrUpdatedDoc.constructor.name === 'CommandResult') {
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

    const parsedSyllabus = parseSyllabus(syllabus);

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


  TopicSchema.post('update', handleUpdate);
  TopicSchema.post('updateOne', handleUpdate);
  TopicSchema.post('findOneAndUpdate', handleUpdate);
  TopicSchema.post('updateMany', handleUpdate);

  TopicSchema.pre('remove', { query: true, document: true }, function (next) {
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
  });


  const Topic = conn.model('Topic', TopicSchema);

  Topic.findLatest = function (slug) {
    return (slug)
      ? this.findOne({ slug })
        .sort({ version: -1 })
        .limit(1)
      : this.aggregate([
        { $sort: { slug: 1, version: -1 } },
        {
          $group: {
            _id: '$slug',
            id: { $first: '$_id' },
            slug: { $first: '$slug' },
            name: { $first: '$title' },
            latestVersion: { $first: '$version' },
            versions: { $push: '$version' },
          },
        },
        { $sort: { _id: 1 } },
      ])
        .then(docs => docs.map(({ id, ...doc }) => ({ ...doc, _id: id })));
  };

  return Topic;
};
