const mongoosePaginate = require('mongoose-paginate');

module.exports = (conn, CohortSchema) => {
  CohortSchema.virtual('topics', {
    ref: 'CohortTopic',
    localField: '_id',
    foreignField: 'cohort',
  });

  CohortSchema.virtual('projects', {
    ref: 'CohortProject',
    localField: '_id',
    foreignField: 'cohort',
  });

  CohortSchema.virtual('topicSettings', {
    ref: 'CohortTopicSettings',
    localField: '_id',
    foreignField: 'cohort',
  });

  CohortSchema.virtual('memberships', {
    ref: 'CohortMembership',
    localField: '_id',
    foreignField: 'cohort',
    count: true,
  });

  CohortSchema.pre('save', function (next) {
    const { Campus, Cohort, Organization } = conn.models;
    Promise.all([
      Campus.findById(this.campus),
      this.organization ? Organization.findById(this.organization) : null,
    ])
      .then(([campus, organization]) => {
        if (!campus) {
          return next(new Error('Campus does not exist'));
        }
        if (this.organization && !organization) {
          return next(new Error('Organization does not exist'));
        }

        if (['pre', 'bc', 'jp'].includes(this.program) && !this.generation) {
          return next(new Error('Generation is required for the next programs bc, pre and jp'));
        }
        const generationString = this.program !== 'l4b' && `${this.generation}`.padStart(3, '0');
        this.name = this.program === 'l4b' || this.name ? this.name : `${campus.slug}${generationString}`;
        this.slug = this.slug || `${campus.slug}-${new Date().toISOString().slice(0, 7)}-${this.program}-${this.track}-${this.name}`;

        return Cohort.findOne({ slug: this.slug });
      })
      .then((cohort) => {
        if (cohort) {
          return next(new Error(`Cohort ${cohort.slug} already exists`));
        }
        return next();
      })
      .catch(next);
  });

  CohortSchema.plugin(mongoosePaginate);
  return conn.model('Cohort', CohortSchema);
};
