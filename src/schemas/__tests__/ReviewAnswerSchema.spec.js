const mongoose = require('mongoose/browser');
const { ReviewQuestionSchema } = require('../')(mongoose);
const ReviewAnswerSchema = require('../ReviewAnswerSchema')(mongoose);


describe('ReviewAnswerSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ReviewAnswerSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const question = new mongoose.Document({}, ReviewQuestionSchema);
    const doc = new mongoose.Document({
      question: question._id,
      value: 'Crack',
    }, ReviewAnswerSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
