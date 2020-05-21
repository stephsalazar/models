module.exports = (conn) => {
  const ExperimentLearningSchema = new conn.Schema({
    variation: { type: String, required: true },
    achieved: { type: Boolean, required: true },
    wins: { type: String, required: true },
    improvements: { type: String, required: true },
    actions: { type: String, required: true },
  }, { timestamps: true });

  return ExperimentLearningSchema;
};
