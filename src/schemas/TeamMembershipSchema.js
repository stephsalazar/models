module.exports = (conn) => {
  const TeamMembershipSchema = new conn.Schema({
    team: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, { collection: 'team_memberships', timestamps: true });

  return TeamMembershipSchema;
};
