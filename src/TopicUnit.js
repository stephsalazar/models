const { orderedObjectToArray } = require('./common');


module.exports = (conn, TopicUnitSchema) => {
  TopicUnitSchema.virtual('parts', {
    ref: 'TopicUnitPart',
    localField: '_id',
    foreignField: 'unit',
  }).set(function (v) {
    this._parts = orderedObjectToArray(v);
  });

  TopicUnitSchema.post('validate', function (doc, next) {
    if (!this._parts) {
      return next();
    }

    return Promise.all(this._parts.map((partData) => {
      const part = new conn.models.TopicUnitPart({ ...partData, unit: doc._id });
      return part.validate();
    }))
      .then(() => next())
      .catch(next);
  });

  TopicUnitSchema.post('save', function (doc, next) {
    const { TopicUnitPart } = conn.models;
    const parts = this._parts;

    if (!parts) {
      return next();
    }

    return TopicUnitPart.remove({ unit: this._id })
      .then(() => Promise.all(parts.map(partData => TopicUnitPart.create({
        ...partData,
        unit: this._id,
      }))))
      .then(() => next())
      .catch(next);
  });

  TopicUnitSchema.pre('remove', { query: true, document: true }, function (next) {
    const { TopicUnit, TopicUnitPart } = conn.models;

    if (this instanceof conn.Query) {
      return TopicUnit.find(this.getQuery())
        .then(units => Promise.all(
          units.map(unit => TopicUnitPart.remove({ unit: unit._id })),
        ))
        .then(() => next())
        .catch(next);
    }

    return TopicUnitPart.remove({ unit: this._id })
      .then(() => next())
      .catch(next);
  });

  const TopicUnit = conn.model('TopicUnit', TopicUnitSchema);

  return TopicUnit;
};
