module.exports = (conn) => {
  const ReviewAnswerSchema = new conn.Schema({
    question: {
      type: conn.Schema.Types.ObjectId,
      ref: 'ReviewQuestion',
      required: true,
      index: true,
    },
    value: {
      type: String,
      trim: true,
    },
  });

  // NOTA: Los test de este callback están el repositorio de models
  ReviewAnswerSchema.pre('save', function (next) {
    const {
      ReviewQuestion,
    } = conn.models;

    Promise.all([
      ReviewQuestion.findById(this.question),
    ])
      .then(([reviewQuestion]) => {
        if (!reviewQuestion) {
          return next(new Error('ReviewQuestion does not exist'));
        }
        return next();
      })
      .catch(next);
  });

  return ReviewAnswerSchema;
};
