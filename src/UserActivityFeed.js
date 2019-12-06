module.exports = (
  conn,
  {
    UserActivityFeedEventSchema,
    AcademicProfileCommentEventSchema,
    AcademicProfileTagAssignedEventSchema,
    AcademicProfileTagRemovalEventSchema,
    ReviewAnswerEventSchema,
  },
) => {
  const UserActivityFeedEvent = conn.model('UserActivityFeedEvent', UserActivityFeedEventSchema);
  const AcademicProfileCommentEvent = UserActivityFeedEvent.discriminator(
    'AcademicProfileCommentEvent',
    AcademicProfileCommentEventSchema,
  );
  const AcademicProfileTagAssignedEvent = UserActivityFeedEvent.discriminator(
    'AcademicProfileTagAssignedEvent',
    AcademicProfileTagAssignedEventSchema,
  );
  const AcademicProfileTagRemovalEvent = UserActivityFeedEvent.discriminator(
    'AcademicProfileTagRemovalEvent',
    AcademicProfileTagRemovalEventSchema,
  );
  const ReviewAnswerEvent = UserActivityFeedEvent.discriminator(
    'ReviewAnswerEvent',
    ReviewAnswerEventSchema,
  );


  return {
    UserActivityFeedEvent,
    AcademicProfileCommentEvent,
    AcademicProfileTagAssignedEvent,
    AcademicProfileTagRemovalEvent,
    ReviewAnswerEvent,
  };
};
