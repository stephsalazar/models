module.exports = (conn) => {
  const ExperimentHypothesisSchema = new conn.Schema({
    believe: { type: String, required: true },
    for: { type: String, required: true },
    gain: { type: String, required: true },
    objective: { type: String, required: true },
    client: { type: String, required: true },
    complexity: { type: Number, required: true },
    value: { type: Number, required: true },
  }, { timestamps: true });

  return ExperimentHypothesisSchema;
};
