const { Schema } = require('mongoose');


const ReviewQuestionSchema = new Schema({
  // id: { type: String },
  order: { type: Number, required: true },
  type: { type: String, enum: ['open', 'multiple-choice'], require: true },
  options: { type: Number },
});


module.exports = new Schema({
  questions: [ReviewQuestionSchema],
});
