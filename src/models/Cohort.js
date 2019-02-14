const mongoose = require('mongoose');
const Campus = require('./Campus');


const CohortSchema = new mongoose.Schema({
  // Previous id in firestore (deprecated/legacy)
  slug: { type: String },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
    required: true,
  },
  program: {
    type: String,
    required: true,
    enum: [
      'pre', // Admission
      'bc', // Bootcamp
      'jp', // Job Placement
      'l4b', // Laboratoria for Business (aka corporate training)
      'ec', // Educación Continua (deprecated!!!)
    ],
  },
  track: {
    type: String,
    required: true,
    enum: [
      'core', // Common Core (Bootcamp)
      'js', // JavaScript Track (Bootcamp)
      'ux', // UX Track (Bootcamp)
      'mobile', // Mobile Track (Bootcamp) - NOT IN USE
      'business', // Corporate Training
    ],
  },
  name: {
    type: String,
    // required: true,
  },
  // `generation` is autoincremented for a given `campus` when _admission_
  // (program: 'pre') cohorts are created. It is required for Bootcamp related
  // cohorts.
  generation: { type: Number },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  publicAdmission: { type: Boolean, default: false, required: true },
  // usersCount: { type: Number, required: true }, // ????
  rubric: {
    type: String,
    default: '2',
    enum: ['1', '2'],
  },
  // cohortCourses???
  // cohortProjects???
});


CohortSchema.pre('validate', function (next) {
  if (['pre', 'l4b'].indexOf(this.program) === -1 && !this.generation) {
    return next(new Error(`Generation is required for program type ${this.program}`));
  }
  return next();
});


CohortSchema.pre('save', function (next) {
  Promise.all([
    Campus.findById(this.campus),
    (this.program !== 'pre' && this.program !== 'l4b')
      // eslint-disable-next-line no-use-before-define
      ? Cohort.findOne({
        campus: this.campus,
        generation: this.generation,
        program: 'pre',
      })
      : Promise.resolve(undefined),
    (this.program === 'pre')
      // eslint-disable-next-line no-use-before-define
      ? Cohort
        .find({
          campus: this.campus,
          program: 'pre',
        })
        .sort({ generation: -1 })
        .limit(1)
      : Promise.resolve(undefined),
  ])
    .then(([campus, admissionCohort, prevAdmissionCohort]) => {
      if (!campus) {
        return next(new Error('Campus does not exist'));
      }
      if (['pre', 'l4b'].indexOf(this.program) === -1 && !admissionCohort) {
        return next(new Error('Generation does not exist'));
      }
      if (this.program === 'pre') {
        this.generation = (
          (prevAdmissionCohort.length && prevAdmissionCohort[0].generation)
            ? prevAdmissionCohort[0].generation + 1
            : 1
        );
      }
      return next();
    })
    .catch(next);
});


const Cohort = mongoose.model('Cohort', CohortSchema);


module.exports = Cohort;
module.exports.Cohort = Cohort;
module.exports.CohortSchema = CohortSchema;
