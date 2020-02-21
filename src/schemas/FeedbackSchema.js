// TODO: Validar que las llaves de `rubricResults` son _ids_
// válidos de _habilidades_ (skills) en la versión especificada de
// la _rúbrica_ y que las llaves de `reviewerSurveyResults` hacen
// referencia a preguntas válidas del `ReviewerSurvey` en cuestión.
const ReviewAnswerSchema = require('./ReviewAnswerSchema');

module.exports = (conn) => {
  const FeedbackSchema = new conn.Schema({
    cohortProject: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortProject',
      required: true,
    },
    cohortMembership: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortMembership',
      required: true,
    },
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    notificationSentAt: {
      type: Date,
    },
    rubric: {
      type: String,
    },
    rubricResults: {
      type: Map,
      of: Number,
    },
    reviewerSurvey: {
      type: String,
      required: true,
    },
    reviewerSurveyResults: [ReviewAnswerSchema(conn)],
  });

  return FeedbackSchema;
};
