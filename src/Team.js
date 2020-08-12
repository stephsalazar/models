module.exports = (conn, TeamSchema) => {
  TeamSchema.virtual('membersCount', {
    ref: 'TeamMembership',
    localField: '_id',
    foreignField: 'team',
    count: true,
  });

  TeamSchema.virtual('experimentsCount', {
    ref: 'Experiment',
    localField: '_id',
    foreignField: 'team',
    count: true,
  });

  return conn.model('Team', TeamSchema);
};
