const mongoose = require('mongoose');
const { CohortMembership, Cohort, User } = require('../')(mongoose);


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
  });

  it('should ...', () => {
    const cohort = new Cohort({});
    const user = new User({});
    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
      role: 'student',
    });
    return cohortMembership.save()
      .then((result) => {
        expect(result.cohort).toBe(cohort._id);
        expect(result.user).toBe(user._id);
        expect(result.role).toBe('student');
      });
  });
});
