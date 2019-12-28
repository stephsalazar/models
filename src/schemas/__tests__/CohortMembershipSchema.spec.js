const mongoose = require('mongoose/browser');
const { CohortMembershipSchema } = require('../')(mongoose);

describe('CohortMembershipSchema', () => {
  it.skip('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, CohortMembershipSchema);
    console.log(doc.validateSync());
    // expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it.skip('should validate document with valid data', () => {
    const doc = new mongoose.Document({
      // slug: 'lim',
      // name: 'Lima',
      // locale: 'es-PE',
      // timezone: 'America/Lima',
      // active: true,
    }, CohortMembershipSchema);

    return doc.validate();
  });
});
