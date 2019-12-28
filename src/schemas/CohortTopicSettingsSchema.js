module.exports = (conn) => {
  const CohortTopicSettingsSchema = new conn.Schema({
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    topic: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    units: {}, // ???
  }, { collection: 'cohort_topic_settings' });

  return CohortTopicSettingsSchema;
};
