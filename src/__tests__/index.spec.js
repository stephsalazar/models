const { validate } = require('../index');


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

  it('should return promise when no callback is passed', () => (
    validate('Project', {
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
    }).catch((err) => {
      expect(err.errors).toMatchSnapshot();
    })
  ));
});
