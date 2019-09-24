const mongoose = require('mongoose/browser');
const AcademicProfileTagSchema = require('../AcademicProfileTagSchema')(mongoose);
const TagSchema = require('../TagSchema')(mongoose);
const UserSchema = require('../UserSchema')(mongoose);

describe('AcademicProfileTagSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileTagSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);
    const tag = new mongoose.Document({}, TagSchema);

    const doc = new mongoose.Document({
      createdBy: createdBy._id,
      tag: tag._id,
      assignmentReason: 'foo',
    }, AcademicProfileTagSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
