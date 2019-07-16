const mongoose = require('mongoose');
const {
  Campus,
  CohortMembership,
  Cohort,
  User,
} = require('../')(mongoose);

const campusJSON = {
  slug: 'lim',
  name: 'Lima',
  locale: 'es-PE',
  timezone: 'America/Lima',
  active: true,
};

describe('CohortMembership', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await CohortMembership.createIndexes();
    await Cohort.createIndexes();
    await User.createIndexes();
    await Campus.createIndexes();
  });

  it('should fail when missing props', () => {
    const cohortMembership = new CohortMembership();
    return cohortMembership.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohort or user are not ObjecIds', () => {
    const cohortMembership = new CohortMembership({
      cohort: 'cohort._id',
      user: 'user._id',
      role: 'student',
    });
    return cohortMembership.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohort does not exist', async () => {
    const user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    const cohortMembership = new CohortMembership({
      cohort: (new Cohort())._id,
      user: user._id,
      role: 'student',
    });

    await user.save();

    return cohortMembership.save()
      .catch((err) => {
        expect(err.message).toBe('Cohort does not exist');
      });
  });

  it('should fail when user does not exist', async () => {
    const campus = new Campus(campusJSON);
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    const cohortMembership = new CohortMembership({
      user: (new User())._id,
      cohort: cohort._id,
      role: 'student',
    });

    await campus.save();
    await cohort.save();

    return cohortMembership.save()
      .catch((err) => {
        expect(err.message).toBe('User does not exist');
      });
  });

  it('should fail validation with a wrong membership role', async () => {
    const campus = new Campus(campusJSON);
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    const user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
      role: 'other',
    });

    await campus.save();
    await cohort.save();
    await user.save();

    return cohortMembership.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail with missing role', async () => {
    const campus = new Campus(campusJSON);
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });
    const user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
    });

    await campus.save();
    await cohort.save();
    await user.save();

    return cohortMembership.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', async () => {
    const campus = new Campus(campusJSON);
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    const user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
      role: 'student',
    });

    await campus.save();
    await cohort.save();
    await user.save();

    return cohortMembership.save()
      .then((result) => {
        expect(result.cohort).toBe(cohort._id);
        expect(result.user).toBe(user._id);
        expect(result.role).toBe('student');
      });
  });
});
