module.exports = (conn) => {
  const ExperimentDefinitionSchema = new conn.Schema({
    description: { type: String, required: true },
  }, { timestamps: true });

  return ExperimentDefinitionSchema;
};
