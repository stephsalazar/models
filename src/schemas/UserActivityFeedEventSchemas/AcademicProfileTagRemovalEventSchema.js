module.exports = (conn) => {
  const AcademicProfileTagRemovalEventSchema = new conn.Schema({
    removedBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    removalReason: {
      type: String,
      required: true,
      trim: true,
    },
  });

  // NOTE: The tests of this callback are the repository of models
  AcademicProfileTagRemovalEventSchema.pre('save', function (next) {
    const { User } = conn.models;

    User.findById(this.removedBy)
      .then((removedBy) => {
        if (!removedBy) {
          return next(new Error('RemovedBy does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return AcademicProfileTagRemovalEventSchema;
};
