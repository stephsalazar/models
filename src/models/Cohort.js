const mongoose = require('mongoose');


const CohortSchema = new mongoose.Schema({
  // slug: {}, // ????
  campus: { type: String, required: true },
  program: {
    type: String,
    required: true,
    enum: ['pre', 'bc', 'jp', 'l4b', 'ec'],
  },
  track: {
    type: String,
    required: true,
    enum: ['core', 'js', 'ux', 'mobile', 'business'],
  },
  generation: { type: Number, required: true },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  publicAdmission: { type: Boolean, default: false },
  // usersCount: { type: Number, required: true }, // ????
  rubric: { type: Date, default: '2' }, // ???
});


const Cohort = mongoose.model('Cohort', CohortSchema);


module.exports = Cohort;
module.exports.Cohort = Cohort;
module.exports.CohortSchema = CohortSchema;
