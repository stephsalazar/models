const mongoose = require('mongoose/browser');
const { UserActivityFeedEventSchemas: { UserActivityFeedEventSchema } } = require('../../')(mongoose);


describe('UserActivityFeedEventSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, UserActivityFeedEventSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const doc = new mongoose.Document({
      user: mongoose.Types.ObjectId(),
      doc: mongoose.Types.ObjectId(),
      type: 'GenericEvent',
    }, UserActivityFeedEventSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
