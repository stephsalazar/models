const mongoose = require('mongoose/browser');
const UserSchema = require('../../UserSchema')(mongoose);
const { UserActivityFeedEventSchemas: { AcademicProfileTagAssignedEventSchema } } = require('../../')(mongoose);


describe('AcademicProfileTagAssignedEventSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileTagAssignedEventSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const doc = new mongoose.Document({
      createdBy,
      tag: 'some one',
      assignmentReason: 'Comment text',
    }, AcademicProfileTagAssignedEventSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
