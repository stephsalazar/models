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
    // It refers to the stage in which she leave the program, for example: 1st day
    stage: {
      type: String,
      required: true,
    },
    // It refers to the student code, for example: LIM022222
    studentCode: {
      type: String,
      required: true,
    },
    // It means to the date of the dropout
    when: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // It means how she leave the program, Leave the program voluntarily
    type: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    // It means to how the BC team see her
    observations: {
      type: String,
      required: true,
    },
    // It means if the BC team is sad, because she is leaving
    sad: {
      type: Boolean,
      required: true,
    },
    // It refers to other reason, for example: coronavirus
    otherReason: {
      type: String,
      required: true,
    },
  }, { collection: 'dropouts', timestamps: true });
  return DropoutSchema;
};
