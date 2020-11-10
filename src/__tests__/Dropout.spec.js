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
  let cohortMembership;

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
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    await campus.save();
    await cohort.save();

    cohortMembership = new CohortMembership({
      user: user._id,
      cohort: cohort._id,
      role: 'student',
    });

    await cohortMembership.save();
  });

  it('should fail when user does not exist', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim007',
      cohortMembership: cohortMembership._id,
      fullName: 'Diego Vélez',
      email: 'someone@somewhere',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      isStaffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('user does not exist');
      });
  });


  it('should fail when cohortMembership does not ObjectId', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim007',
      cohortMembership: 'cohortMembership._id',
      fullName: 'Diego Vélez',
      email: 'someone@somewhere',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      isStaffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should create a new dropout', async () => {
    const doc = new Dropout({
      campus: 'lim',
      cohort: 'lim007',
      cohortMembership: cohortMembership._id,
      fullName: 'Diego Vélez',
      email: 'someone@somewhere.com',
      signUpCampus: 'LIM',
      date: '5/14/2018',
      project: 'Cipher',
      stage: 1,
      studentCode: 'LIM181080',
      reason: 'dropout',
      reasonDetail: 'Problemas familiares y económicos',
      notes: 'Una lástima, era una buena estudiante :(',
      isStaffSad: true,
      covidRelated: 'yes',
    });

    return doc.save()
      .then((dropout) => {
        console.log('Debug', dropout, doc);
        expect(dropout.email).toBe(doc.email);
      });
  });
});
