const mongoose = require('mongoose/browser');
const { ProjectSchema } = require('../')(mongoose);

describe('ProjectSchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ProjectSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when version not semver compatible', () => {
    const doc = new mongoose.Document({
      version: 'foo',
    }, ProjectSchema);
    return doc.validate()
      .catch(err => expect(err.errors.version.message).toBe('Invalid semver version foo'));
  });

  it('should successfully validate with proper values', (done) => {
    const doc = new mongoose.Document({
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.0.0',
      parserVersion: '1.1.1',
      createdAt: new Date(),
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      track: 'js',
      skills: {},
    }, ProjectSchema);
    doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
