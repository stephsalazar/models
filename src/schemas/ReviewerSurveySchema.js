const {
  semverVersion,
} = require('./common');

module.exports = (conn) => {
  const ReviewerSurveySchema = new conn.Schema({
    questions: {
      type: [conn.Schema.Types.ObjectId],
      ref: 'ReviewQuestion',
      required: true,
    },
    version: semverVersion,
  }, { collection: 'reviewer_surveys' });

  return ReviewerSurveySchema;
};
