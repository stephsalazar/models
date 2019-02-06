const { Project } = require('../Project');


describe('Project', () => {
  it('should validate ...', (done) => {
    const project = new Project({
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
    });
    project.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
