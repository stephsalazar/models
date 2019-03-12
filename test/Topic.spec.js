const mongoose = require('mongoose');
const { Topic } = require('../')(mongoose);
const babelJson = require('./fixtures/topics/babel.json');


describe('Topic', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Topic.createIndexes();
  });

  it('should save babel topic and then get with Topic.findLatest(slug)', () => {
    const topic = new Topic(babelJson);
    return topic.save()
      .then((result) => {
        expect(result.slug).toBe('babel');
        return Topic.findLatest('babel');
      })
      .then(doc => expect(doc.slug).toBe('babel'));
  });

  it('should save babel topic and then get with Topic.findLatest()', () => {
    const topic = new Topic(babelJson);
    return topic.save()
      .then((result) => {
        expect(result.slug).toBe('babel');
        return Topic.findLatest();
      })
      .then(docs => expect(docs[0].slug).toBe('babel'));
  });
});
