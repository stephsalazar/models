module.exports = (conn, DropoutSchema) => {
  DropoutSchema.pre('save', function (next) {
    const { User, Cohort } = conn.models;
    Promise.all([
      User.findOne({ email: this.email }),
      Cohort.findOne({ name: this.cohort.toUpperCase(), track: this.track }),
    ])
      .then(([user, cohort]) => {
        if (!user) {
          return next(new Error('user does not exist'));
        }
        if (!cohort) {
          return next(new Error('cohort does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const Dropout = conn.model('Dropout', DropoutSchema);

  return Dropout;
};
