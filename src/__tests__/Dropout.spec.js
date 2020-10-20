const mongoose = require('mongoose');
const { User, Dropout } = require('../../')(mongoose);

describe('Dropout', () => {
  let user;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Dropout.createIndexes();
    await User.createIndexes();
    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });
    await user.save();
  });

  it('should fail validation when missing fields are provided', () => {
    const doc = new Dropout();

    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when user not ObjecId', () => {
    const doc = new Dropout({
      city: 'LIM',
      cohort: 'LIM007',
      user: 'user._id',
      stage: 'Project 1',
      studentCode: 'LIM181080',
      when: '5/14/2018',
      type: 'Leave the program voluntarily',
      reason: 'Problemas familiares y económicos',
      observations: 'Una lástima, era una buena estudiante :(',
      sad: true,
      otherReason: 'I do not know (pero ya agoté todos los recursos para averiguarlo)',
    });

    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when user does not exist', async () => {
    const doc = new Dropout({
      city: 'LIM',
      cohort: 'LIM007',
      user: (new User())._id,
      stage: 'Project 1',
      studentCode: 'LIM181080',
      when: '5/14/2018',
      type: 'Leave the program voluntarily',
      reason: 'Problemas familiares y económicos',
      observations: 'Una lástima, era una buena estudiante :(',
      sad: true,
      otherReason: 'I do not know (pero ya agoté todos los recursos para averiguarlo)',
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does not exist');
      });
  });
  it('should successful when user does exist', async () => {
    const doc = new Dropout({
      city: 'LIM',
      cohort: 'LIM007',
      user: user._id,
      stage: 'Project 1',
      studentCode: 'LIM181080',
      when: '5/14/2018',
      type: 'Leave the program voluntarily',
      reason: 'Problemas familiares y económicos',
      observations: 'Una lástima, era una buena estudiante :(',
      sad: true,
      otherReason: 'I do not know (pero ya agoté todos los recursos para averiguarlo)',
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does exist');
      });
  });
});
