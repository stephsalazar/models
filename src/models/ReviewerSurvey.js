const mongoose = require('mongoose');


const ReviewQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['open', 'multiple-choice'], require: true },
  options: { type: Number },
});


ReviewQuestionSchema.pre('validate', function (next) {
  if (this.type === 'multiple-choice' && !this.options) {
    return next(new Error('Options is required when type is multiple-choice'));
  }
  return next();
});


const ReviewerSurveySchema = new mongoose.Schema({
  questions: [ReviewQuestionSchema],
});


const ReviewerSurvey = mongoose.model('ReviewerSurvey', ReviewerSurveySchema);


module.exports = ReviewerSurvey;
module.exports.ReviewerSurvey = ReviewerSurvey;
module.exports.ReviewerSurveySchema = ReviewerSurveySchema;
