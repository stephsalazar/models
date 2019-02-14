const mongoose = require('mongoose');


const PartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['read', 'seminar', 'workshop', 'quiz', 'practice', 'other'],
  },
  format: {
    type: String,
    required: true,
    enum: ['guided', 'self-paced'],
  },
  duration: { type: Number, required: true },
  body: { type: String, required: true },
  durationString: { type: String, required: true },
});


// const QuizSchema = new mongoose.Schema({});
// const ExerciseSchema = new mongoose.Schema({});


const UnitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bonus: { type: Boolean, required: true }, // ???
  description: { type: String }, // Should this be required???
  parts: { type: Map, of: PartSchema, required: true },
  order: { type: Number, required: true },
  stats: {
    duration: { type: Number, required: true },
    durationString: { type: String, required: true },
    exerciseCount: { type: Number, required: true },
    partCount: { type: Number, required: true },
  },
});


const TopicSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  repo: { type: String, required: true },
  path: { type: String, required: true },
  version: { type: String, required: true },
  parserVersion: { type: String, required: true },
  track: { type: String, required: true },
  locale: {
    type: String,
    enum: ['es-ES', 'pt-BR'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String },
  tags: {}, // ?? describe nested objects??? { primary: {...}, secondary: {...} }
  targetAudience: { type: String },
  dependencies: { type: String },
  learningObjectives: { type: String },
  product: { type: String },
  syllabus: { type: Map, of: UnitSchema, required: true },
  grades: { type: String },
  contributors: { type: String },
  books: { type: String },
  benchmarks: { type: String },
  references: { type: String },
  stats: {
    duration: { type: Number, required: true },
    durationString: { type: String, required: true },
    exerciseCount: { type: Number, required: true },
    unitCount: { type: Number, required: true },
    partCount: { type: Number, required: true },
  },
});


const Topic = mongoose.model('Topic', TopicSchema);


module.exports = Topic;
module.exports.Topic = Topic;
module.exports.TopicSchema = TopicSchema;
