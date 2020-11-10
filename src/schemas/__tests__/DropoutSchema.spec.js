const mongoose = require('mongoose/browser');
const { DropoutSchema } = require('..')(mongoose);

describe('DropoutSchema', () => {
  it('should fail validation when fields are missing', () => {
    const doc = new mongoose.Document({}, DropoutSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });
  it('should successfully validate with proper values', (done) => {
    const doc = new mongoose.Document({
      campus: 'lim',
      cohort: 'lim007',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere.com',
      signUpCampus: 'BOG',
      date: '5/14/2018',
      stage: 1,
      project: 'Cipher',
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      staffSad: true,
      covidRelated: 'yes',
    }, DropoutSchema);
    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
