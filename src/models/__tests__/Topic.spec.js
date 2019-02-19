const mongoose = require('mongoose');
const { TopicSchema } = require('schemas')(mongoose);
const Topic = require('../Topic')(mongoose, TopicSchema);
const babelTopicJson = require('./fixtures/topics/babel');


describe('Topic', () => {
  it('should fail validattion when missing props', () => {
    const topic = new Topic({ name: null });
    return topic.validate()
      .catch((err) => {
        expect(err.name).toBe('ValidationError');
        expect(err.errors).toMatchSnapshot();
      });
  });

  it('should validate existing topic json', () => {
    const babelTopic = new Topic(babelTopicJson);
    return babelTopic.validate();
  });
});
