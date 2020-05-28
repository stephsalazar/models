module.exports = (conn) => {
  const ExperimentUserPersonaSchema = require('./ExperimentUserPersonaSchema');
  const ExperimentHypothesisSchema = require('./ExperimentHypothesisSchema');
  const ExperimentProblemSchema = require('./ExperimentProblemSchema');
  const ExperimentDefinitionSchema = require('./ExperimentDefinitionSchema');
  const ExperimentMetricSchema = require('./ExperimentMetricSchema');
  const ExperimentLearningSchema = require('./ExperimentLearningSchema');

  const ExperimentIterationSchema = new conn.Schema({
    version: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    parts: {
      userPersona: [ExperimentUserPersonaSchema(conn)],
      problem: [ExperimentProblemSchema(conn)],
      hypothesis: [ExperimentHypothesisSchema(conn)],
      metric: [ExperimentMetricSchema(conn)],
      experimentDefinition: [ExperimentDefinitionSchema(conn)],
      learning: [ExperimentLearningSchema(conn)],
    },
  }, { collection: 'iterations', timestamps: true });

  return ExperimentIterationSchema;
};
