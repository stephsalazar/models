
module.exports = (conn) => {
  const ProgressProjectSchema = new conn.Schema({
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  }, { collection: 'project_progresses' });

  return ProgressProjectSchema;
};
