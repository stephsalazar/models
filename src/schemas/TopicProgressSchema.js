module.exports = (conn) => {
  const TopicProgressSchema = new conn.Schema(
    {},
    { strict: false, collection: 'topic_progresses' },
  );
  TopicProgressSchema.index({ cohortid: 1, courseid: 1, unitid: 1 });

  return TopicProgressSchema;
};
