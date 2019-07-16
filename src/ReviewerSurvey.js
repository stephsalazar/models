module.exports = (conn, ReviewerSurveySchema) => {
  ReviewerSurveySchema.pre('save', function (next) {
    const {
      ReviewQuestion,
    } = conn.models;
    Promise.all([
      Promise.all(this.questions.map(question => ReviewQuestion.findById(question))),
    ])
      .then(([questions]) => {
        const invalidQuestions = questions.filter(question => !question);
        if (invalidQuestions.length > 0) {
          return next(new Error('ReviewQuestion does not exist', invalidQuestions.join(', ')));
        }
        return next();
      })
      .catch(next);
  });

  const ReviewerSurvey = conn.model('ReviewerSurvey', ReviewerSurveySchema);

  return ReviewerSurvey;
};
