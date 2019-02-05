const mongoose = require('mongoose');


const schemas = {
  CampusSchema: require('./src/CampusSchema'),
  ProjectFeedbackSchema: require('./src/ProjectFeedbackSchema'),
  ProjectSchema: require('./src/ProjectSchema'),
  ReviewerSurveySchema: require('./src/ReviewerSurveySchema'),
  TopicSchema: require('./src/TopicSchema'),
};


module.exports = {
  ...schemas,
  validate: (type, value, cb) => {
    const Model = mongoose.model(type, schemas[`${type}Schema`]);
    const model = new Model(value);
    model.validate(cb);
  },
};
