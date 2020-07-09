const { slug, program, track } = require('./common');


module.exports = (conn) => {
  const CohortSchema = new conn.Schema({
    // Previous id in firestore (deprecated/legacy)
    slug: {
      ...slug,
      required: false,
      unique: false,
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
    createdAt: { type: Date, default: Date.now, required: true },
    startAt: { type: Date, default: Date.now, required: true },
    endAt: { type: Date },
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
      default: null,
    },
    state: {
      index: true,
      type: String,
      default: 'loadingStudents',
      enum: ['loadingStudents', 'planned', 'active', 'finished'],
    },
  }, {
    timestamps: true,
  });

  CohortSchema.index({ slug: 'text' });

  return CohortSchema;
};
