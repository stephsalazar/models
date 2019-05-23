module.exports = (conn, CohortSchema) => {
  const { Campus } = conn.models;

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

  CohortSchema.virtual('platziCourses', {
    ref: 'CohortPlatziCourse',
    localField: '_id',
    foreignField: 'cohort',
  });

  CohortSchema.virtual('topicSettings', {
    ref: 'CohortTopicSettings',
    localField: '_id',
    foreignField: 'cohort',
  });

  CohortSchema.pre('save', function (next) {
    Campus.findById(this.campus)
      .then(campus => (
        (!campus)
          ? next(new Error('Campus does not exist'))
          : next()
      ))
      .catch(next);
  });

  return conn.model('Cohort', CohortSchema);
};
