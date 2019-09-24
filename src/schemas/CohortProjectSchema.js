module.exports = (conn) => {
  const CohortProjectSchema = new conn.Schema({
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    project: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  }, { collection: 'cohort_projects' });

  CohortProjectSchema.index({ cohort: 1, project: 1 }, { unique: true });

  return CohortProjectSchema;
};
