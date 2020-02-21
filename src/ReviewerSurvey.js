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

  ReviewerSurvey.findLatest = function () {
    return this.aggregate([
      {
        $sort: { slug: 1, version: -1 },
      },
      {
        $group: {
          _id: null,
          id: { $first: '$_id' },
          slug: { $first: '$slug' },
          latestVersion: { $first: '$version' },
          questions: { $first: '$questions' },
        },
      },
      { $sort: { _id: -1 } },
      {
        $lookup:
          {
            from: 'review_questions',
            localField: 'questions',
            foreignField: '_id',
            as: 'questions',
          },
      },
    ])
      .then(docs => docs.map(({ id, ...doc }) => ({ ...doc, _id: id })));
  };

  return ReviewerSurvey;
};
