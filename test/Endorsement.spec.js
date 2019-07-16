const mongoose = require('mongoose');
const { Endorsement } = require('../')(mongoose);

describe('Endorsement', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Endorsement.createIndexes();
  });

  it('should fail when missing props', () => {
    const endorsement = new Endorsement();
    return endorsement.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when endorsement is not a string', () => {
    const endorsement = new Endorsement({
      text: [],
    });
    return endorsement.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const endorsement = new Endorsement({
      text: 'foo',
    });

    return endorsement.save()
      .then((result) => {
        expect(typeof result.text).toBe('string');
        expect(result.text).toBe(endorsement.text);
      });
  });
});
