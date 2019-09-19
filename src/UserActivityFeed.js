module.exports = (
  conn,
  {
    UserActivityFeedEventSchema,
    AcademicProfileCommentEventSchema,
    ReviewAnswerEventSchema,
  },
) => {
  const UserActivityFeedEvent = conn.model('UserActivityFeedEvent', UserActivityFeedEventSchema);
  const AcademicProfileCommentEvent = UserActivityFeedEvent.discriminator(
    'AcademicProfileCommentEvent',
    AcademicProfileCommentEventSchema,
  );
  const ReviewAnswerEvent = UserActivityFeedEvent.discriminator(
    'ReviewAnswerEvent',
    ReviewAnswerEventSchema,
  );

  return {
    UserActivityFeedEvent,
    AcademicProfileCommentEvent,
    ReviewAnswerEvent,
  };
};
