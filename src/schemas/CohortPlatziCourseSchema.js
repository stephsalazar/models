module.exports = (conn) => {
  const CohortPlatziCourseSchema = new conn.Schema({
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }, { collection: 'cohort_platzi_courses' });

  CohortPlatziCourseSchema.index({ cohort: 1, id: 1 }, { unique: true });

  return CohortPlatziCourseSchema;
};
