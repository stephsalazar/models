const { ProjectSchema, TopicSchema } = require('./');


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
