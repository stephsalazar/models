module.exports = (conn, CohortMembershipSchema) => conn.model(
  'CohortMembership',
  CohortMembershipSchema,
);
