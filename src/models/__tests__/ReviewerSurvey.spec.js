const mongoose = require('mongoose');
const { ReviewerSurveySchema } = require('../ReviewerSurvey');
// const ReviewQuestionSchema = require('../ReviewQuestionSchema');


describe('ReviewerSurvey', () => {
  it('should ...', (done) => {
    const ReviewerSurveyModel = mongoose.model('ReviewerSurvey', ReviewerSurveySchema);
    // const ReviewQuestionModel = mongoose.model('ReviewQuestion', ReviewQuestionSchema);
    // const question = new ReviewQuestionModel({
    //   type: 'open',
    // });
    const reviewerSurvey = new ReviewerSurveyModel({
      // questions: [question],
    });
    reviewerSurvey.validate((err) => {
      expect(err).toBe(null);
      // console.log(reviewerSurvey);
      done();
    });
  });
});
