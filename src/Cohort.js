const mongoosePaginate = require('mongoose-paginate');

module.exports = (conn, CohortSchema) => {
  const { Campus, Organization } = conn.models;

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
        return next();
      })
      .catch(next);
  });

  CohortSchema.plugin(mongoosePaginate);
  return conn.model('Cohort', CohortSchema);
};
