module.exports = (conn, CohortSchema) => {
  const { Campus } = conn.models;

  CohortSchema.pre('save', function (next) {
    Campus.findById(this.campus)
      .then(campus => (
        (!campus)
          ? next(new Error('Campus does not exist'))
          : next()
      ))
      .catch(next);
  });

  return conn.model('Cohort', CohortSchema);
};
