module.exports = (conn, ProjectFeedbackSchema) => {
  const { Cohort, Project, ReviewerSurvey } = conn.models;

  ProjectFeedbackSchema.pre('save', function (next) {
    Promise.all([
      Cohort.findById(this.cohort),
      Project.findById(this.project),
      ReviewerSurvey.findById(this.reviewerSurvey),
    ])
      .then(([cohort, project, reviewerSurvey]) => {
        if (!project) {
          return next(new Error('Project does not exist'));
        }
        if (!cohort) {
          return next(new Error('Cohort does not exist'));
        }
        if (!reviewerSurvey) {
          return next(new Error('ReviewerSurvey does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const ProjectFeedback = conn.model('ProjectFeedback', ProjectFeedbackSchema);

  return ProjectFeedback;
};
