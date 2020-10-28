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

  it('should fail when email does not exist', async () => {
    const doc = new Dropout({
      city: 'LIM',
      cohort: 'LIM007',
      fullName: 'Diego Vélez',
      email: '',
      signUpCohortCity: 'BOG',
      date: '5/14/2018',
      stage: 'Project 1',
      studentCode: 'LIM181080',
      reason: 'Leave the program voluntarily',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      sad: true,
      covidRelated: true,
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does not exist');
      });
  });
  it('should create a new dropout', async () => {
    const doc = new Dropout({
      city: 'LIM',
      cohort: 'LIM007',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere.com',
      signUpCohortCity: 'BOG',
      date: '5/14/2018',
      stage: 'Project 1',
      studentCode: 'LIM181080',
      reason: 'Leave the program voluntarily',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      sad: true,
      covidRelated: true,
    });

    return doc.save()
      .then((dropout) => {
        expect(dropout.email).toBe(doc.email);
      });
  });
});
