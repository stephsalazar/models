const { ReviewerSurvey } = require('../ReviewerSurvey');


describe('ReviewerSurvey', () => {
  it('should fail validation when question missing id', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { type: 'open' },
        { id: 'bar', type: 'multiple-choice', options: 4 },
      ],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors['questions.0.id']).toMatchSnapshot());
  });

  it('should fail validation when multiple-choice missing options', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { id: 'bar', type: 'multiple-choice' },
      ],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when wrong type', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [{ id: 'bar', type: 'other' }],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when question options not a number', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [{ id: 'bar', type: 'multiple-choice', options: 'hola' }],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should pass validation when all good ;-)', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { id: 'foo', type: 'open' },
        { id: 'bar', type: 'multiple-choice', options: 4 },
      ],
    });
    return reviewerSurvey.validate();
  });
});
