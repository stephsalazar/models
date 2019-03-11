const schemas = require('schemas');
const createCampusModel = require('./src/Campus');
const createCohortMembershipModel = require('./src/CohortMembership');
const createCohortModel = require('./src/Cohort');
const createProjectModel = require('./src/Project');
const createProjectFeedbackModel = require('./src/ProjectFeedback');
const createReviewerSurveyModel = require('./src/ReviewerSurvey');
const createTopicModel = require('./src/Topic');
const createUserModel = require('./src/User');


module.exports = (conn) => {
  const {
    CampusSchema,
    CohortMembershipSchema,
    CohortSchema,
    ProjectSchema,
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    TopicSchema,
    UserSchema,
  } = schemas(conn);

  const models = {
    Campus: createCampusModel(conn, CampusSchema),
    CohortMembership: createCohortMembershipModel(conn, CohortMembershipSchema),
    Cohort: createCohortModel(conn, CohortSchema),
    Project: createProjectModel(conn, ProjectSchema),
    ReviewerSurvey: createReviewerSurveyModel(conn, ReviewerSurveySchema),
    ProjectFeedback: createProjectFeedbackModel(conn, ProjectFeedbackSchema),
    Topic: createTopicModel(conn, TopicSchema),
    User: createUserModel(conn, UserSchema),
    CampusSchema,
    CohortMembershipSchema,
    CohortSchema,
    ProjectSchema,
    ReviewerSurveySchema,
    ProjectFeedbackSchema,
    TopicSchema,
    UserSchema,
  };

  return {
    ...models,
    validate: (type, value, cb) => {
      const model = new models[type](value);
      if (typeof cb === 'function') {
        return model.validate(cb);
      }
      // When no args passed to `model.validate()` it returns a promise.
      return model.validate();
    },
  };
};
