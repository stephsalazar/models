module.exports = (conn, ProgressProjectSchema) => {
  ProgressProjectSchema.pre('save', function (next) {
    const {
      CohortProject,
      CohortMembership,
      User,
    } = conn.models;

    Promise.all([
      CohortProject.findById(this.cohortProject),
      CohortMembership.findById(this.cohortMembership),
      User.findById(this.createdBy),
    ])
      .then(([cohortProject, cohortMembership, createdBy]) => {
        if (!cohortProject) {
          return next(new Error('CohortProject does not exist'));
        }
        if (!cohortMembership) {
          return next(new Error('CohortMembership does not exist'));
        }
        if (!createdBy) {
          return next(new Error('CreatedBy does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const ProgressProject = conn.model('ProgressProject', ProgressProjectSchema);

  return ProgressProject;
};
