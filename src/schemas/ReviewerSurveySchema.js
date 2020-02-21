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
    slug: {
      type: String,
      required: true,
    },
  }, { collection: 'reviewer_surveys' });

  ReviewerSurveySchema.index({ slug: 1, version: 1 }, { unique: true });

  return ReviewerSurveySchema;
};
