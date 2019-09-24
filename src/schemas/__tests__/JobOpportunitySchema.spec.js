const mongoose = require('mongoose/browser');
const { OrganizationMembershipSchema, JobOpportunitySchema, CampusSchema } = require('../')(mongoose);

describe('Opportunity', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, JobOpportunitySchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate ...', (done) => {
    const employer = new mongoose.Document({}, OrganizationMembershipSchema);
    const campus = new mongoose.Document({}, CampusSchema);

    const opportunity = new mongoose.Document({
      employer: employer._id,
      address: ' Av. Almirante Grau',
      city: 'Lima',
      campus: campus._id,
      vacancies: 3,
      title: 'Desenvolvedor Front-end Junior',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis',
      type: 'Front-end Developer',
      hireType: 'payroll',
      scheduleType: 'part-time',
      salaryRange: 'R$3.501 to R$4.000',
      tentativeStart: new Date(),
      active: true,
    }, JobOpportunitySchema);

    opportunity.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
