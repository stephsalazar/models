const mongoose = require('mongoose/browser');
const {
  JobOpportunitySchema,
  UserSchema,
  OrganizationSchema,
  HiringProcessSchema,
} = require('../')(mongoose);

describe('HiringProcessSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, HiringProcessSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate ...', (done) => {
    const opportunity = new mongoose.Document({}, JobOpportunitySchema);
    const user = new mongoose.Document({}, UserSchema);
    const organization = new mongoose.Document({}, OrganizationSchema);

    const hiring = new mongoose.Document({
      opportunity: opportunity._id,
      user: user._id,
      organization: organization._id,
      createDate: new Date(),
      acceptedDate: new Date(),
      createProposalDate: new Date(),
      startDate: new Date(),
      salary: 1000,
      active: true,
    }, HiringProcessSchema);

    hiring.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
