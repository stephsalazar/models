const mongoose = require('mongoose');
const { User } = require('../')(mongoose);


describe('User', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await User.createIndexes();
  });

  it('should ony require uid, email and name??', () => {
    const user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });
    return user.save()
      .then((result) => {
        expect(result.uid).toBe('abcdefghijklmnopqrstuvwxyz');
        expect(result.email).toBe('someone@somewhere.com');
        expect(result.name).toBe('Someone');
        expect(Array.isArray(result.roles)).toBe(true);
        expect(result.roles.length).toBe(0);
      });
  });
});
