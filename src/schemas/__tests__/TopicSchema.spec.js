const mongoose = require('mongoose/browser');
const { TopicSchema } = require('../')(mongoose);
const babelTopicJson = require('./fixtures/topics/babel');

describe('TopicSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, TopicSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should pass sync validation ...', () => {
    const doc = new mongoose.Document({
      slug: 'foo',
      repo: 'foo/bar',
      path: '.',
      version: '1.0.0',
      parserVersion: '2.0.0',
      track: 'js',
      locale: 'es-ES',
      title: 'Foo',
      stats: {
        partCount: 0,
        unitCount: 0,
        exerciseCount: 0,
        durationString: '0min',
        duration: 0,
      },
    }, TopicSchema);
    expect(doc.validateSync()).toBe(undefined);
  });

  it('should validate existing topic json', () => {
    const babelTopic = new mongoose.Document(babelTopicJson, TopicSchema);
    return babelTopic.validate();
  });
});
