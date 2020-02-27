const mongoose = require('mongoose/browser');
const {
  CohortProjectSchema,
  CohortMembershipSchema,
  ProjectProgressSchema,
} = require('..')(mongoose);

describe('ProjectProgressSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ProjectProgressSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values without ReviewAnswer', (done) => {
    const cohortProject = new mongoose.Document({}, CohortProjectSchema);
    const cohortMembership = new mongoose.Document({}, CohortMembershipSchema);

    const doc = new mongoose.Document({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdAt: new Date(),
    }, ProjectProgressSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });

  it('should successfully validate with proper values', (done) => {
    const cohortProject = new mongoose.Document({}, CohortProjectSchema);
    const cohortMembership = new mongoose.Document({}, CohortMembershipSchema);

    const doc = new mongoose.Document({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdAt: new Date(),
    }, ProjectProgressSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
