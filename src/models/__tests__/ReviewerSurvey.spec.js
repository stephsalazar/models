const mongoose = require('mongoose');
const { ReviewerSurveySchema } = require('schemas')(mongoose);
const ReviewerSurvey = require('../ReviewerSurvey')(mongoose, ReviewerSurveySchema);


describe('ReviewerSurvey', () => {
  it('should fail validation when question missing slug', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { type: 'open' },
        { slug: 'bar', type: 'multiple-choice', options: 4 },
      ],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors['questions.0.slug']).toMatchSnapshot());
  });

  it('should fail validation when multiple-choice missing options', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { slug: 'bar', type: 'multiple-choice' },
      ],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when wrong type', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [{ slug: 'bar', type: 'other' }],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when question options not a number', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [{ slug: 'bar', type: 'multiple-choice', options: 'hola' }],
    });
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should pass validation when all good ;-)', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { slug: 'foo', type: 'open' },
        { slug: 'bar', type: 'multiple-choice', options: 4 },
      ],
    });
    return reviewerSurvey.validate();
  });
});
