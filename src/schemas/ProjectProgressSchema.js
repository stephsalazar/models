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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    feedbackRequestedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  }, {
    collection: 'project_progresses',
  });

  ProjectProgressSchema.virtual('state').get(function () {
    if (this.feedbackRequestedAt && !this.completedAt) {
      return 'readyForFeedback';
    }

    if (this.completedAt) {
      return 'completed';
    }
    return 'inProgress';
  });

  ProjectProgressSchema.set('toJSON', { getters: true });

  return ProjectProgressSchema;
};
