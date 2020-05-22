const mongoose = require('mongoose/browser');
const { OrganizationSchema } = require('../')(mongoose);

describe('OrganizationSchema', () => {
  it('should fail validation when fields missing', () => {
    // name && slug (slug: se crea en Talento o API, basándonos en el nombre)
    const doc = new mongoose.Document({}, OrganizationSchema);
    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should pass validation when at least name and slug', () => {
    const doc = new mongoose.Document({
      name: 'organizationName',
      slug: 'name.slug',
    }, OrganizationSchema);
    return doc.validate();
  });
});
