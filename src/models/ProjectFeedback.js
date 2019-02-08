const mongoose = require('mongoose');
const Cohort = require('./Cohort');
const Project = require('./Project');
const ReviewerSurvey = require('./ReviewerSurvey');


// TODO: Validar que las llaves de `rubricResults` son _ids_
// válidos de _habilidades_ (skills) en la versión especificada de
// la _rúbrica_ y que las llaves de `reviewerSurveyResults` hacen
// referencia a preguntas válidas del `ReviewerSurvey` en cuestión.


const ProjectFeedbackSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cohort',
    required: true,
  },
  // `uid` debería ser un `ObjectId` que apunte al `user`????
  uid: { type: String, required: true }, // Firebase UID
  // `uid` de la evaluadora...
  createdBy: { type: String, required: true }, // Firebase UID
  createdAt: { type: Date, required: true, default: Date.now },
  // `rubric` hace referencia a la versión (major) de la rúbrica
  rubric: { type: String, required: true, enum: ['1', '2'] },
  // `rubricResults` debería ser requerido???
  rubricResults: { type: Map, of: Number, required: true },
  // `reviewerSurvey` es el id de un objeto de tipo ReviewerSurvey
  reviewerSurvey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewerSurvey',
    required: true,
  },
  // `reviewerSurveyResults` debería ser Map de Number o String????
  reviewerSurveyResults: { type: Map, of: String },
  notes: { type: String },
});


ProjectFeedbackSchema.pre('save', function (next) {
  Promise.all([
    Cohort.findById(this.cohort),
    Project.findById(this.project),
    ReviewerSurvey.findById(this.reviewerSurvey),
  ])
    .then(([cohort, project, reviewerSurvey]) => {
      if (!project) {
        return next(new Error('Project does not exist'));
      }
      if (!cohort) {
        return next(new Error('Cohort does not exist'));
      }
      if (!reviewerSurvey) {
        return next(new Error('ReviewerSurvey does not exist'));
      }
      return next();
    })
    .catch(next);
});


const ProjectFeedback = mongoose.model('ProjectFeedback', ProjectFeedbackSchema);


module.exports = ProjectFeedback;
module.exports.ProjectFeedback = ProjectFeedback;
module.exports.ProjectFeedbackSchema = ProjectFeedbackSchema;
