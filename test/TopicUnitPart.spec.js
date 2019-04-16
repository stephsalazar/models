const mongoose = require('mongoose');
const { TopicUnit, TopicUnitPart } = require('../')(mongoose);


describe('TopicUnitPart', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await TopicUnitPart.createIndexes();
  });

  it('should save part and then find it', () => {
    const unit = new TopicUnit();
    const part = new TopicUnitPart({
      unit: unit._id,
      slug: 'foo',
      type: 'read',
      format: 'self-paced',
      duration: 10,
      durationString: '10min',
      title: 'Foo',
      body: 'Blah!',
    });
    return part.save()
      .then(({ slug, version }) => {
        expect(slug).toBe('foo');
        return TopicUnitPart.findOne({ slug, version });
      })
      .then(doc => expect(doc.slug).toBe('foo'));
  });
});
