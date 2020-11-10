module.exports = (conn, DropoutSchema) => {
  DropoutSchema.pre('save', function (next) {
    const { User, CohortMembership } = conn.models;

    Promise.all([
      User.findOne({ email: this.email }),
      CohortMembership.findById(this.cohortMembership),
    ])
      .then(([user, cohortMembership]) => {
        if (!user) {
          return next(new Error('user does not exist'));
        }
        if (!cohortMembership) {
          return next(new Error('CohortMembership does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const Dropout = conn.model('Dropout', DropoutSchema);

  return Dropout;
};
