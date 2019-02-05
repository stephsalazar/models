const { Schema } = require('mongoose');


module.exports = new Schema({
  slug: { type: String, required: true },
  repo: { type: String, required: true },
  path: { type: String, required: true },
  version: { type: String, required: true },
  parserVersion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  prefix: Number,
  title: { type: String, required: true },
  rubric: { type: String, required: true },
  locale: { type: String, required: true },
  track: { type: String, required: true },
  skills: {},
});
