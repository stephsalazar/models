const mongoose = require('mongoose');
const {
  Campus,
  Cohort,
  CohortMembership,
  Dropout,
  User,
} = require('../../')(mongoose);

const campusJSON = {
  slug: 'lim',
  name: 'Lima',
  locale: 'es-PE',
  timezone: 'America/Lima',
  active: true,
};

describe('Dropout', () => {
  let user;
  let cohort;

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
    await Campus.createIndexes();
    await Cohort.createIndexes();
    await CohortMembership.createIndexes();
    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    await user.save();
    const campus = new Campus(campusJSON);
    cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 7,
      start: new Date(),
      end: new Date(),
      name: 'LIM007',
    });

    await campus.save();
    await cohort.save();
  });

  it('should fail when user does not exist', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim007',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      track: 'core',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      staffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does not exist');
      });
  });

  it('should fail when cohort does not exist', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim006',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      track: 'core',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      staffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does not exist');
      });
  });

  it('should create a new dropout', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim007',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere.com',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      track: 'core',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      staffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .then((dropout) => {
        expect(dropout.email).toBe(doc.email);
      });
  });
});
