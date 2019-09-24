const mongoose = require('mongoose/browser');
const AcademicProfileEndorsementSchema = require('../AcademicProfileEndorsementSchema')(mongoose);
const EndorsementSchema = require('../EndorsementSchema')(mongoose);
const UserSchema = require('../UserSchema')(mongoose);

describe('AcademicProfileEndorsementSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileEndorsementSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const endorsement = new mongoose.Document({}, EndorsementSchema);
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const doc = new mongoose.Document({
      createdBy: createdBy._id,
      endorsement: endorsement._id,
    }, AcademicProfileEndorsementSchema);

    doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
