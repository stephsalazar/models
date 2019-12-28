const mongoose = require('mongoose/browser');
const UserSchema = require('../../UserSchema')(mongoose);
const { UserActivityFeedEventSchemas: { AcademicProfileTagRemovalEventSchema } } = require('../../')(mongoose);


describe('AcademicProfileTagRemovalEventSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileTagRemovalEventSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const removedBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const doc = new mongoose.Document({
      removedBy,
      tag: 'someone',
      removalReason: 'someone text',
    }, AcademicProfileTagRemovalEventSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
