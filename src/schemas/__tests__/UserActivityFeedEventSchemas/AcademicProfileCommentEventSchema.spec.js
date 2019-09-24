const mongoose = require('mongoose/browser');
const UserSchema = require('../../UserSchema')(mongoose);
const { UserActivityFeedEventSchemas: { AcademicProfileCommentEventSchema } } = require('../../')(mongoose);


describe('AcademicProfileCommentEventSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileCommentEventSchema);
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
    }, AcademicProfileCommentEventSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
