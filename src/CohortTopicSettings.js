module.exports = (conn, CohortTopicSettingsSchema) => conn.model(
  'CohortTopicSettings',
  CohortTopicSettingsSchema,
);
