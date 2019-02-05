const { Schema } = require('mongoose');


/*
{
  "tags": {
    "primary": {
      "babel": true,
      "compiler": true,
      "transpiler": true,
      "js": true,
      "jsx": true,
      "es6": true
    },
    "secondary": {}
  },
  "syllabus": {
    "01-intro": {
      "title": "Conceptos básicos",
      "bonus": false,
      "description": "",
      "parts": {
        "01-what-is-babel": {
          "title": "¿Qué es Babel?",
          "type": "read",
          "format": "self-paced",
          "duration": 10,
          "body": "...",
          "durationString": "10min"
        },
        "02-usage": {
          "title": "Guía de uso",
          "type": "read",
          "format": "self-paced",
          "duration": 20,
          "body": "...",
          "durationString": "20min"
        },
        "03-configuration": {
          "title": "Guía de configuración",
          "type": "read",
          "format": "self-paced",
          "duration": 10,
          "body": "...",
          "durationString": "10min"
        }
      },
      "order": 0,
      "stats": {
        "duration": 40,
        "durationString": "40min",
        "exerciseCount": 0,
        "partCount": 3
      }
    }
  },
}
*/


module.exports = new Schema({
  slug: { type: String, required: true },
  order: { type: Number, required: true }, // ????
  title: { type: String, required: true },
  description: { type: String },
  tags: {},
  targetAudience: { type: String },
  dependencies: { type: String },
  learningObjectives: { type: String },
  product: { type: String },
  syllabus: {},
  grades: { type: String },
  contributors: { type: String },
  books: { type: String },
  benchmarks: { type: String },
  references: { type: String },
  repo: { type: String, required: true },
  path: { type: String, required: true },
  version: { type: String, required: true },
  parserVersion: { type: String, required: true },
  track: { type: String, required: true },
  locale: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  stats: {
    duration: { type: Number, required: true },
    durationString: { type: String, required: true },
    exerciseCount: { type: Number, required: true },
    unitCount: { type: Number, required: true },
    partCount: { type: Number, required: true },
  },
});
