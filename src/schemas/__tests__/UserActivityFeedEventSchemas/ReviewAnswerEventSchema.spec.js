const mongoose = require('mongoose/browser');
const UserSchema = require('../../UserSchema')(mongoose);
const { UserActivityFeedEventSchemas: { ReviewAnswerEventSchema } } = require('../../')(mongoose);


describe('ReviewAnswerEventSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ReviewAnswerEventSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const doc = new mongoose.Document({
      createdBy,
      commentType: 'tech',
      project: 'Placeholder project title',
      text: 'Comment text',
    }, ReviewAnswerEventSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
