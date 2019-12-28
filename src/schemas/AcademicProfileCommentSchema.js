module.exports = (conn) => {
  const AcademicProfileCommentSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cohortProject: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortProject',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'tech',
        'soft',
        'general',
      ],
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  });

  // NOTA: Los test de este callback están el repositorio de models
  AcademicProfileCommentSchema.pre('save', function (next) {
    const {
      User,
      CohortProject,
    } = conn.models;

    Promise.all([
      User.findById(this.createdBy),
      CohortProject.findById(this.cohortProject),
    ])
      .then(([createdBy, cohortProject]) => {
        if (!createdBy) {
          return next(new Error('CreatedBy does not exist'));
        }
        if (!cohortProject) {
          return next(new Error('CohortProject does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return AcademicProfileCommentSchema;
};
