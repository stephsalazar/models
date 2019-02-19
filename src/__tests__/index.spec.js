const mongoose = require('mongoose');
const { validate } = require('../index')(mongoose);


describe('validate', () => {
  it('should invoke callback with mongoose errors', (done) => {
    validate('Project', {
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.1.0',
      parserVersion: '1.1.1',
      createdAt: '2019-02-05T17:55:03.264Z',
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      skills: {},
    }, (err) => {
      expect(err.errors).toMatchSnapshot();
      done();
    });
  });

  it('should invoke callback with no errors when valid', (done) => {
    validate('Project', {
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.1.0',
      parserVersion: '1.1.1',
      createdAt: '2019-02-05T17:55:03.264Z',
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      track: 'js',
      skills: {
        softPlanning: 2,
        selfLearning: 2,
        presentations: 2,
        adaptability: 2,
        problemSolving: 2,
        teamWork: 2,
        responsabilidad: 2,
        feedback: 2,
        communication: 2,
        logic: 1,
        architecture: 1,
        git: 1,
        github: 2,
        jsStyle: 2,
        jsSemantics: 2,
        modularity: 1,
        jsTesting: 2,
        htmlValidation: 2,
        htmlStyle: 3,
        htmlSemantics: 2,
        cssDry: 2,
        cssResponsive: 2,
        userCentricity: 2,
      },
    }, (err) => {
      expect(err).toBe(null);
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
