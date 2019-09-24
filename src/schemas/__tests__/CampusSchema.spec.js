const mongoose = require('mongoose/browser');
const { CampusSchema } = require('../')(mongoose);

describe('CampusSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, CampusSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate document with valid data', () => {
    const doc = new mongoose.Document({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    }, CampusSchema);

    return doc.validate();
  });
});
