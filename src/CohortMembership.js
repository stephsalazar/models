module.exports = (conn, CohortMembershipSchema) => {
  CohortMembershipSchema.pre('save', function (next) {
    const {
      Cohort,
      User,
    } = conn.models;

    Promise.all([
      Cohort.findById(this.cohort),
      User.findById(this.user),
    ])
      .then(([cohort, user]) => {
        if (!user) {
          return next(new Error('User does not exist'));
        }
        if (!cohort) {
          return next(new Error('Cohort does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  const CohortMembership = conn.model('CohortMembership', CohortMembershipSchema);

  return CohortMembership;
};
