module.exports = (conn) => {
  const ExperimentProblemSchema = new conn.Schema({
    description: { type: String, required: true },
  }, { timestamps: true });

  return ExperimentProblemSchema;
};
