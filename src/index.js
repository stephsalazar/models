const { Campus, CampusSchema } = require('./models/Campus');
const { Cohort, CohortSchema } = require('./models/Cohort');
const { Project, ProjectSchema } = require('./models/Project');
const { ProjectFeedback, ProjectFeedbackSchema } = require('./models/ProjectFeedback');
const { ReviewerSurvey, ReviewerSurveySchema } = require('./models/ReviewerSurvey');
const { Topic, TopicSchema } = require('./models/Topic');


module.exports = {
  Campus,
  CampusSchema,
  Cohort,
  CohortSchema,
  Project,
  ProjectSchema,
  ProjectFeedback,
  ProjectFeedbackSchema,
  ReviewerSurvey,
  ReviewerSurveySchema,
  Topic,
  TopicSchema,
  validate: (type, value, cb) => {
    const model = new module.exports[type](value);
    if (typeof cb === 'function') {
      return model.validate(cb);
    }
    // When no args passed to `model.validate()` it returns a promise.
    return model.validate();
  },
};
