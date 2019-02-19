// const { Campus, CampusSchema } = require('./models/Campus');
// const { Cohort, CohortSchema } = require('./models/Cohort');
// const { Project, ProjectSchema } = require('./models/Project');
// const { ProjectFeedback, ProjectFeedbackSchema } = require('./models/ProjectFeedback');
// const { ReviewerSurvey, ReviewerSurveySchema } = require('./models/ReviewerSurvey');
// const { Topic, TopicSchema } = require('./models/Topic');


// module.exports = {
//   Campus,
//   CampusSchema,
//   Cohort,
//   CohortSchema,
//   Project,
//   ProjectSchema,
//   ProjectFeedback,
//   ProjectFeedbackSchema,
//   ReviewerSurvey,
//   ReviewerSurveySchema,
//   Topic,
//   TopicSchema,
//   validate: (type, value, cb) => {
//     const model = new module.exports[type](value);
//     if (typeof cb === 'function') {
//       return model.validate(cb);
//     }
//     // When no args passed to `model.validate()` it returns a promise.
//     return model.validate();
//   },
// };


const schemas = require('schemas');
const createCampusModel = require('./models/Campus');
const createCohortModel = require('./models/Cohort');
const createProjectModel = require('./models/Project');
const createProjectFeedbackModel = require('./models/ProjectFeedback');
const createReviewerSurveyModel = require('./models/ReviewerSurvey');
const createTopicModel = require('./models/Topic');


module.exports = (conn) => {
  const {
    CampusSchema,
    CohortSchema,
    ProjectSchema,
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    TopicSchema,
  } = schemas(conn);

  const models = {
    Campus: createCampusModel(conn, CampusSchema),
    Cohort: createCohortModel(conn, CohortSchema),
    Project: createProjectModel(conn, ProjectSchema),
    ReviewerSurvey: createReviewerSurveyModel(conn, ReviewerSurveySchema),
    ProjectFeedback: createProjectFeedbackModel(conn, ProjectFeedbackSchema),
    Topic: createTopicModel(conn, TopicSchema),
    CampusSchema,
    CohortSchema,
    ProjectSchema,
    ReviewerSurveySchema,
    ProjectFeedbackSchema,
    TopicSchema,
  };

  models.validate = (type, value, cb) => {
    const model = new models[type](value);
    if (typeof cb === 'function') {
      return model.validate(cb);
    }
    // When no args passed to `model.validate()` it returns a promise.
    return model.validate();
  };

  return models;
};
