const mongoose = require('mongoose');


const ReviewQuestionSchema = new mongoose.Schema({
  // order: { type: Number, required: true },
  type: { type: String, enum: ['open', 'multiple-choice'], require: true },
  options: { type: Number }, // solo si es multiple choice????
});


const ReviewerSurveySchema = new mongoose.Schema({
  questions: [ReviewQuestionSchema],
});


const ReviewerSurvey = mongoose.model('ReviewerSurvey', ReviewerSurveySchema);


module.exports = ReviewerSurvey;
module.exports.ReviewerSurvey = ReviewerSurvey;
module.exports.ReviewerSurveySchema = ReviewerSurveySchema;
