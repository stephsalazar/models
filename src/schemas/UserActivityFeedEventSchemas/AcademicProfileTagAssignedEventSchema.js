module.exports = (conn) => {
  const AcademicProfileTagAssignedEventSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    assignmentReason: {
      type: String,
      required: true,
      trim: true,
    },
  });

  // NOTE: The tests of this callback are the repository of models
  AcademicProfileTagAssignedEventSchema.pre('save', function (next) {
    const { User } = conn.models;

    User.findById(this.createdBy)
      .then((createdBy) => {
        if (!createdBy) {
          return next(new Error('CreatedBy does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return AcademicProfileTagAssignedEventSchema;
};
