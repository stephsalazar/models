const mongoose = require('mongoose');
const { Tag } = require('../')(mongoose);

describe('Tag', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Tag.createIndexes();
  });

  it('should fail with missing props', () => {
    const tag = new Tag();
    return tag.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when tag is not a string', () => {
    const tag = new Tag({
      text: [],
    });
    return tag.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const tag = new Tag({
      text: 'foo',
    });

    return tag.save()
      .then((result) => {
        expect(typeof result.text).toBe('string');
        expect(result.text).toBe(tag.text);
      });
  });
});
