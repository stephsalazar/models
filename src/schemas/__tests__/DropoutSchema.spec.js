const mongoose = require('mongoose/browser');
const { UserSchema } = require('..')(mongoose);
const DropoutSchema = require('../DropoutSchema')(mongoose);

describe('DropoutSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, DropoutSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });
  it('should successfully validate with proper values', (done) => {
    const userSchema = new mongoose.Document({}, UserSchema);
    const doc = new mongoose.Document({
      city: 'LIM',
      cohort: 'LIM007',
      user: userSchema._id,
      stage: 'Project 1',
      studentCode: 'LIM181080',
      when: '5/14/2018',
      type: 'Leave the program voluntarily',
      reason: 'Problemas familiares y económicos',
      observations: 'Una lástima, era una buena estudiante :(',
      sad: true,
      otherReason: 'I do not know (pero ya agoté todos los recursos para averiguarlo)',
    }, DropoutSchema);
    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
