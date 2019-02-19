module.exports = (conn, CohortSchema) => {
  const { Campus } = conn.models;

  CohortSchema.pre('save', function (next) {
    Promise.all([
      Campus.findById(this.campus),
      (this.program !== 'pre' && this.program !== 'l4b')
        // eslint-disable-next-line no-use-before-define
        ? Cohort.findOne({
          campus: this.campus,
          generation: this.generation,
          program: 'pre',
        })
        : Promise.resolve(undefined),
      (this.program === 'pre')
        // eslint-disable-next-line no-use-before-define
        ? Cohort
          .find({
            campus: this.campus,
            program: 'pre',
          })
          .sort({ generation: -1 })
          .limit(1)
        : Promise.resolve(undefined),
    ])
      .then(([campus, admissionCohort, prevAdmissionCohort]) => {
        if (!campus) {
          return next(new Error('Campus does not exist'));
        }
        if (['pre', 'l4b'].indexOf(this.program) === -1 && !admissionCohort) {
          return next(new Error('Generation does not exist'));
        }
        if (this.program === 'pre') {
          this.generation = (
            (prevAdmissionCohort.length && prevAdmissionCohort[0].generation)
              ? prevAdmissionCohort[0].generation + 1
              : 1
          );
        }
        return next();
      })
      .catch(next);
  });

  const Cohort = conn.model('Cohort', CohortSchema);

  return Cohort;
};
