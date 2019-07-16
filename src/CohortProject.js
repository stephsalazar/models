module.exports = (conn, CohortProjectSchema) => {
  CohortProjectSchema.pre('save', function (next) {
    const {
      Cohort,
      Project,
    } = conn.models;

    Promise.all([
      Cohort.findById(this.cohort),
      Project.findById(this.project),
    ])
      .then(([cohort, project]) => {
        if (!project) {
          return next(new Error('Project does not exist'));
        }
        if (!cohort) {
          return next(new Error('Cohort does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  const CohortProject = conn.model('CohortProject', CohortProjectSchema);

  return CohortProject;
};
