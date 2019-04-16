const mongoose = require('mongoose');
const { Campus, Cohort } = require('../')(mongoose);


describe('Cohort', () => {
  let campus;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Campus.createIndexes();
    await Cohort.createIndexes();
    campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });
    await campus.save();
  });

  it('should fail when campus does not exist', () => {
    const cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: (new Campus({}))._id,
      program: 'bc',
      track: 'core',
      name: 'am',
      generation: 9,
      start: new Date(),
      end: new Date(),
    });

    return cohort.save()
      .catch(err => expect(err.message).toBe('Campus does not exist'));
  });

  it('should create common core cohort for a given generation', () => {
    const cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: campus._id,
      program: 'bc',
      track: 'core',
      name: 'am',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    return cohort.save()
      .then((result) => {
        const {
          _id,
          campus: cohortCampus,
          start,
          end,
          ...obj
        } = result.toJSON();
        expect(obj).toMatchSnapshot();
        return Cohort.findById(_id);
      })
      .then((doc) => {
        expect(`${doc._id}`).toBe(`${cohort._id}`);
      });
  });
});
