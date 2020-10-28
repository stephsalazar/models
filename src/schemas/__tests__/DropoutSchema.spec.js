const mongoose = require('mongoose/browser');
const DropoutSchema = require('../DropoutSchema')(mongoose);

describe('DropoutSchema', () => {
  it('should fail validation when fields are missing', () => {
    const doc = new mongoose.Document({}, DropoutSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });
  it('should successfully validate with proper values', (done) => {
    const doc = new mongoose.Document({
      city: 'LIM',
      cohort: 'LIM007',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere.com',
      signUpCohortCity: 'BOG',
      date: '5/14/2018',
      stage: 'Project 1',
      studentCode: 'LIM181080',
      reason: 'Leave the program voluntarily',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      sad: true,
      covidRelated: true,
    }, DropoutSchema);
    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
