const mongoose = require('mongoose/browser');
const { OrganizationMembershipSchema, OrganizationSchema, UserSchema } = require('../')(mongoose);

describe('OrganizationMembershipSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, OrganizationMembershipSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate ...', (done) => {
    const organization = new mongoose.Document({}, OrganizationSchema);
    const user = new mongoose.Document({}, UserSchema);

    const employer = new mongoose.Document({
      user: user._id,
      organization: organization._id,
    }, OrganizationMembershipSchema);

    employer.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
