module.exports = (conn) => {
  const ExperimentMetricSchema = new conn.Schema({
    description: { type: String, required: true },
  }, { timestamps: true });

  return ExperimentMetricSchema;
};
