module.exports = (conn) => {
  const ExperimentIterationSchema = require('./ExperimentIterationSchema');
  const ExperimentSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // keep for legacy UID from firebase
    uid: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    iterations: [ExperimentIterationSchema(conn)],
    active: { type: Boolean, required: true, default: true },
    lastVersion: { type: Number, required: true, default: 0 },
  }, { collection: 'experiments', timestamps: true });

  return ExperimentSchema;
};
