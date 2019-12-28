const mongoose = require('mongoose/browser');
const { GraduateProfileProjectSchema, UserSchema } = require('../')(mongoose);

describe('GraduateProfileProjectSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, GraduateProfileProjectSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate example', (done) => {
    const user = new mongoose.Document({}, UserSchema);
    const graduateProfileProject = new mongoose.Document({
      user: user._id,
      name: 'Foo',
      urls: ['https://lupomontero.github.io/media/'],
    }, GraduateProfileProjectSchema);

    graduateProfileProject.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
