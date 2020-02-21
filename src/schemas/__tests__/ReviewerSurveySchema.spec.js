const mongoose = require('mongoose/browser');
const { ReviewerSurveySchema, ReviewQuestionSchema } = require('../')(mongoose);

describe('ReviewerSurveySchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ReviewerSurveySchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when version not semver compatible', () => {
    const question = new mongoose.Document({}, ReviewQuestionSchema);
    const doc = new mongoose.Document({
      questions: [question._id],
      version: 'foo',
      slug: 'project-feedback',
    }, ReviewerSurveySchema);

    return doc.validate()
      .catch(err => expect(err.errors.version.message).toBe('Invalid semver version foo'));
  });

  it('should successfully validate with proper values', (done) => {
    const question = new mongoose.Document({}, ReviewQuestionSchema);
    const doc = new mongoose.Document({
      questions: [question._id],
      version: '2.0.0',
      slug: 'project-feedback',
    }, ReviewerSurveySchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
