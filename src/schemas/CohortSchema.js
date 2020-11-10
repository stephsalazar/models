const { slug, program, track } = require('./common');


module.exports = (conn) => {
  const CohortSchema = new conn.Schema({
    // Previous id in firestore (deprecated/legacy)
    slug: {
      ...slug,
      required: false,
    },
    campus: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Campus',
      required: true,
    },
    program,
    track,
    name: {
      type: String,
      // required: true, ???
    },
    description: {
      type: String,
    },
    generation: { type: Number },
    start: { type: Date, default: Date.now, required: true },
    end: { type: Date },
    publicAdmission: {
      type: Boolean,
      default: false,
      required: true,
    },
    rubric: {
      type: String,
      default: '2',
      enum: ['0', '1', '2'],
    },
    organization: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    // Por el mometo vas a registrar 3 tipos de estados pora un cohort
    // InProgress: Par cohorts en curso, notStarted: Para cohort que aún no han empezado
    // y Closed: Para cohorts que ya han sido cerrados.
    state: {
      index: true,
      type: String,
      default: 'inProgress',
      enum: ['inProgress', 'closed', 'notStarted'],
    },
    hasExperiments: {
      type: Boolean,
      default: false,
      required: true,
    },
  }, {
    timestamps: { createdAt: true, updatedAt: true },
  });

  CohortSchema.index({ slug: 'text' });

  return CohortSchema;
};
