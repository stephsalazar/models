module.exports = (conn, ProjectProgressSchema) => {
  ProjectProgressSchema.pre('save', function (next) {
    const {
      CohortProject,
      CohortMembership,
    } = conn.models;

    Promise.all([
      CohortProject.findById(this.cohortProject),
      CohortMembership.findById(this.cohortMembership),
    ])
      .then(([cohortProject, cohortMembership]) => {
        if (!cohortProject) {
          return next(new Error('CohortProject does not exist'));
        }
        if (!cohortMembership) {
          return next(new Error('CohortMembership does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const ProjectProgress = conn.model('ProjectProgress', ProjectProgressSchema);

  return ProjectProgress;
};
