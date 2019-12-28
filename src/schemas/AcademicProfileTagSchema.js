module.exports = (conn) => {
  const AcademicProfileTagSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    removedBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
    tag: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
    customTitle: {
      type: String,
      trim: true,
    },
    assignmentReason: {
      type: String,
      trim: true,
      required: true,
    },
    removalReason: {
      type: String,
      trim: true,
    },
  });

  // NOTA: Los test de este callback están el repositorio de models
  AcademicProfileTagSchema.pre('save', function (next) {
    const {
      User,
      Tag,
    } = conn.models;

    Promise.all([
      User.findById(this.createdBy),
      Tag.findById(this.tag),
    ])
      .then(([createdBy, tag]) => {
        if (!createdBy) {
          return next(new Error('CreatedBy does not exist'));
        }
        if (!tag) {
          return next(new Error('Tag does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return AcademicProfileTagSchema;
};
