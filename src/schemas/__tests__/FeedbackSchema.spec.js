const mongoose = require('mongoose/browser');
const {
  CohortProjectSchema,
  CohortMembershipSchema,
  FeedbackSchema,
  ReviewQuestionSchema,
  UserSchema,
} = require('..')(mongoose);
const ReviewAnswerSchema = require('../ReviewAnswerSchema')(mongoose);

describe('FeedbackSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, FeedbackSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values without ReviewAnswer', (done) => {
    const cohortProject = new mongoose.Document({}, CohortProjectSchema);
    const cohortMembership = new mongoose.Document({}, CohortMembershipSchema);
    const createdBy = new mongoose.Document({}, UserSchema);

    const doc = new mongoose.Document({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdBy: createdBy._id,
      rubric: '2',
      rubricResults: {
        logic: 5,
        architecture: 3,
        communication: 4,
        github: 5,
      },
      reviewerSurvey: 'project-feedback',
    }, FeedbackSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });

  it('should successfully validate with proper values with ReviewAnswer', (done) => {
    const cohortProject = new mongoose.Document({}, CohortProjectSchema);
    const cohortMembership = new mongoose.Document({}, CohortMembershipSchema);
    const createdBy = new mongoose.Document({}, UserSchema);
    const question = new mongoose.Document({}, ReviewQuestionSchema);
    const reviewAnswer = new mongoose.Document({
      question: question._id,
      value: 'Crack',
    }, ReviewAnswerSchema);

    const doc = new mongoose.Document({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdBy: createdBy._id,
      rubric: '2',
      rubricResults: {
        logic: 5,
        architecture: 3,
        communication: 4,
        github: 5,
      },
      reviewerSurvey: 'project-feedback',
      reviewerSurveyResults: [
        reviewAnswer,
      ],
    }, FeedbackSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
