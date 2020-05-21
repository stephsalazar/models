
module.exports = (conn) => {
  const ExperimentUserPersona = require('./ExperimentUserPersonaSchema');
  const ExperimentHypothesisSchema = require('./ExperimentHypothesisSchema');
  const ExperimentProblemSchema = require('./ExperimentProblemSchema');
  const ExperimentMetricSchema = require('./ExperimentMetricSchema');
  const ExperimentLearningSchema = require('./ExperimentLearningSchema');

  const ExperimentIterationSchema = new conn.Schema({
    version: { type: String, required: true },
    active: { type: Boolean, require: true, default: true },
    parts: {
      userPersona: [ExperimentUserPersona(conn)],
      problem: [ExperimentProblemSchema(conn)],
      hypothesis: [ExperimentHypothesisSchema(conn)],
      metric: [ExperimentMetricSchema(conn)],
      learning: [ExperimentLearningSchema(conn)],
    },
  }, { collection: 'iterations', timestamps: true });

  return ExperimentIterationSchema;
};
