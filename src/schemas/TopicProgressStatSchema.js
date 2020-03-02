module.exports = (conn) => {
  const TopicProgressStatSchema = new conn.Schema(
    {},
    { strict: false, collection: 'topic_progress_stats' },
  );
  TopicProgressStatSchema.index({ cohortid: 1, courseid: 1, unitid: 1 });

  return TopicProgressStatSchema;
};
