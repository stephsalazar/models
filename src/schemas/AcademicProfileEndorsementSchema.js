module.exports = (conn) => {
  const AcademicProfileEndorsementSchema = new conn.Schema({
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    endorsement: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Endorsement',
      required: true,
    },
  });

  // NOTA: Los test de este callback están el repositorio de models
  AcademicProfileEndorsementSchema.pre('save', function (next) {
    const {
      Endorsement,
      User,
    } = conn.models;

    Promise.all([
      User.findById(this.createdBy),
      Endorsement.findById(this.endorsement),
    ])
      .then(([createdBy, endorsement]) => {
        if (!createdBy) {
          return next(new Error('CreatedBy does not exist'));
        }
        if (!endorsement) {
          return next(new Error('Endorsement does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return AcademicProfileEndorsementSchema;
};
