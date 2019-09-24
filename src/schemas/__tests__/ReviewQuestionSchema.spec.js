const mongoose = require('mongoose/browser');
const { ReviewQuestionSchema } = require('../')(mongoose);

describe('ReviewQuestionSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ReviewQuestionSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when multipleChoice question is missing options', (done) => {
    const doc = new mongoose.Document({
      i18nId: 'foo',
      type: 'multipleChoice',
      visibility: 'private',
    }, ReviewQuestionSchema);

    doc.validate((err) => {
      expect(err.message).toBe('Options is required when type is multipleChoice');
      done();
    });
  });

  it('should fail validation when question is missing i18nId', () => {
    const doc = new mongoose.Document({
      type: 'multipleChoice',
      visibility: 'private',
      options: ['1', '2'],
    }, ReviewQuestionSchema);

    return doc.validate()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail validation providing an unknown type', () => {
    const doc = new mongoose.Document({
      i18nId: 'bar',
      type: 'other',
      visibility: 'public',
    }, ReviewQuestionSchema);

    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should validate good review Open Question', (done) => {
    const doc = new mongoose.Document({
      i18nId: 'foo',
      type: 'open',
      visibility: 'public',
    }, ReviewQuestionSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });

  it('should validate good review MultipleChoice Question', (done) => {
    const doc = new mongoose.Document({
      i18nId: 'bar',
      type: 'multipleChoice',
      visibility: 'private',
      options: ['1', '2'],
    }, ReviewQuestionSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
