module.exports = (conn, CohortMembershipSchema) => {
  const CohortMembership = conn.model('CohortMembership', CohortMembershipSchema);

  return CohortMembership;
};
