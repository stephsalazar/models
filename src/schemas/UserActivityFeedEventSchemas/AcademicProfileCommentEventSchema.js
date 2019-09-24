module.exports = (conn) => {
  const AcademicProfileCommentEventSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    commentType: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  });

  // NOTA: Los test de este callback están el repositorio de models
  AcademicProfileCommentEventSchema.pre('save', function (next) {
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

  return AcademicProfileCommentEventSchema;
};
