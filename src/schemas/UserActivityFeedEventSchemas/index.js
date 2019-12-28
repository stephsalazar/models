const AcademicProfileCommentEventSchema = require('./AcademicProfileCommentEventSchema');
const AcademicProfileTagAssignedEventSchema = require('./AcademicProfileTagAssignedEventSchema');
const AcademicProfileTagRemovalEventSchema = require('./AcademicProfileTagRemovalEventSchema');
const ReviewAnswerEventSchema = require('./ReviewAnswerEventSchema');

module.exports = (conn) => {
  const UserActivityFeedEventSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      default: 'UserActivityFeedEvent',
    },
    doc: {
      type: conn.Schema.Types.ObjectId,
      required: true,
    },
  }, {
    collection: 'user_activity_feed',
    discriminatorKey: 'type',
  });

  return {
    UserActivityFeedEventSchema,
    AcademicProfileCommentEventSchema: AcademicProfileCommentEventSchema(conn),
    AcademicProfileTagAssignedEventSchema: AcademicProfileTagAssignedEventSchema(conn),
    AcademicProfileTagRemovalEventSchema: AcademicProfileTagRemovalEventSchema(conn),
    ReviewAnswerEventSchema: ReviewAnswerEventSchema(conn),
  };
};
