const { validate, ProjectSchema, TopicSchema } = require('./');

describe('validate', () => {
  it('should invoke callback with mongoose errors', (done) => {
    validate('Project', {
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
    }, (err) => {
      expect(err.errors).toMatchSnapshot();
      done();
    });
  });
});

describe('schemas.ProjectSchema', () => {
  it('should be an object', () => {
    expect(typeof ProjectSchema).toBe('object');
  });
});

describe('schemas.TopicSchema', () => {
  it('should be an object', () => {
    expect(typeof TopicSchema).toBe('object');
  });
});
