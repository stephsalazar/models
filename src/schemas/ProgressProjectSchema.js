
module.exports = (conn) => {
  const ProjectProgressSchema = new conn.Schema({
    cohortProject: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortProject',
      required: true,
    },
    cohortMembership: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortMembership',
      required: true,
    },
    openedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  });

  return ProjectProgressSchema;
};
