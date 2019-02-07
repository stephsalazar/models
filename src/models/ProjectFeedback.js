const mongoose = require('mongoose');


// TODO: Validar que las llaves de `rubricResults` son _ids_
// válidos de _habilidades_ (skills) en la versión especificada de
// la _rúbrica_ y que las llaves de `reviewerSurveyResults` hacen
// referencia a preguntas válidas del `ReviewerSurvey` en cuestión.


const ProjectFeedbackSchema = new mongoose.Schema({
  // `projectid` debería ser un `ObjectId` que apunte al `project`?????
  projectid: { type: String, required: true },
  // `uid` debería ser un `ObjectId` que apunte al `user`????
  uid: { type: String, required: true },
  // `cohortid` debería ser un `ObjectId` que apunte al `cohort`????
  cohortid: { type: String, required: true },
  createdBy: { type: String, required: true }, // `uid` de la evaluadora...
  createdAt: { type: Date, required: true, default: Date.now },
  // `rubric` hace referencia a la versión (major) de la rúbrica
  rubric: { type: String, required: true, enum: ['1', '2'] },
  // `rubricResults` debería ser requerido???
  rubricResults: { type: Map, of: Number, required: true },
  // `reviewerSurvey` es el id de un objeto de tipo ReviewerSurvey
  reviewerSurvey: { type: String, required: true },
  // `reviewerSurveyResults` debería ser Map de Number o String????
  reviewerSurveyResults: { type: Map, of: String },
  notes: { type: String },
});


const ProjectFeedback = mongoose.model('ProjectFeedback', ProjectFeedbackSchema);


module.exports = ProjectFeedback;
module.exports.ProjectFeedback = ProjectFeedback;
module.exports.ProjectFeedbackSchema = ProjectFeedbackSchema;
