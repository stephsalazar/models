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
    state: {
      index: true,
      type: String,
      default: 'inProgress',
      enum: ['inProgress', 'closed', 'onHold'],
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
