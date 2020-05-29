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
      userPersona: {
        type: ExperimentUserPersonaSchema(conn),
        default: null,
      },
      problem: {
        type: ExperimentProblemSchema(conn),
        default: null,
      },
      hypothesis: {
        type: ExperimentHypothesisSchema(conn),
        default: null,
      },
      metric: {
        type: ExperimentMetricSchema(conn),
        default: null,
      },
      experimentDefinition: {
        type: ExperimentDefinitionSchema(conn),
        default: null,
      },
      learning: {
        type: ExperimentLearningSchema(conn),
        default: null,
      },
    },
  }, { collection: 'iterations', timestamps: true });

  return ExperimentIterationSchema;
};
