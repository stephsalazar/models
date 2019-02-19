const mongoose = require('mongoose');
const {
  CohortSchema,
  ProjectSchema,
  ReviewerSurveySchema,
  ProjectFeedbackSchema,
} = require('schemas')(mongoose);
const Cohort = require('../Cohort')(mongoose, CohortSchema);
const Project = require('../Project')(mongoose, ProjectSchema);
const ReviewerSurvey = require('../ReviewerSurvey')(mongoose, ReviewerSurveySchema);
const ProjectFeedback = require('../ProjectFeedback')(mongoose, ProjectFeedbackSchema);


describe('ProjectFeedback', () => {
  it('should validate example', (done) => {
    const project = new Project({});
    const cohort = new Cohort({});
    const reviewerSurvey = new ReviewerSurvey({});

    const projectFeedback = new ProjectFeedback({
      project: project._id,
      cohort: cohort._id,
      uid: '9x7YelqRH8hX3QRz0qV6IAhYlek1',
      createdBy: '<UID>',
      createdAt: new Date(),
      rubric: '2',
      rubricResults: {
        logic: 5,
        architecture: 3,
        communication: 4,
        github: 5,
      },
      reviewerSurvey: reviewerSurvey._id,
      reviewerSurveyResults: {
        perception: 2,
        soft: 'soft comment',
        dropout: 3,
        tech: 'tech comment',
        engagement: 1,
      },
      notes: 'revisar esto:\n-\n-\n-',
    });
    projectFeedback.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
