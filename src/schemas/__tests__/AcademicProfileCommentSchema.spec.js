const mongoose = require('mongoose/browser');
const AcademicProfileCommentSchema = require('../AcademicProfileCommentSchema')(mongoose);
const CohortProjectSchema = require('../CohortProjectSchema')(mongoose);
const UserSchema = require('../UserSchema')(mongoose);

describe('AcademicProfileCommentSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, AcademicProfileCommentSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);
    const cohortProject = new mongoose.Document({}, CohortProjectSchema);

    const doc = new mongoose.Document({
      createdBy: createdBy._id,
      cohortProject: cohortProject._id,
      type: 'tech',
      text: 'foo',
    }, AcademicProfileCommentSchema);

    doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
