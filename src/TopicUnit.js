module.exports = (conn, TopicUnitSchema) => {
  TopicUnitSchema.virtual('parts', {
    ref: 'TopicUnitPart',
    localField: '_id',
    foreignField: 'unit',
  }).set(function (v) {
    this._parts = (
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
