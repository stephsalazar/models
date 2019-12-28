module.exports = (conn) => {
  const ReviewQuestionSchema = new conn.Schema({
    i18nId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['open', 'multipleChoice'],
      required: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      required: true,
    },
    options: {
      type: [String],
    },
  }, { collection: 'review_questions' });

  ReviewQuestionSchema.pre('validate', function (next) {
    if (this.type === 'multipleChoice' && (!this.options || (this.options && this.options.length === 0))) {
      return next(new Error('Options is required when type is multipleChoice'));
    }
    return next();
  });

  return ReviewQuestionSchema;
};
