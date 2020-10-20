module.exports = (conn) => {
  const DropoutSchema = new conn.Schema({
    city: {
      type: String,
      required: true,
    },
    cohort: {
      type: String,
      required: true,
    },
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    studentCode: {
      type: String,
      required: true,
    },
    when: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    observations: {
      type: String,
      required: true,
    },
    sad: {
      type: Boolean,
      required: true,
    },
    otherReason: {
      type: String,
      required: true,
    },
  }, { collection: 'dropouts', timestamps: true });
  return DropoutSchema;
};
