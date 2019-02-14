const mongoose = require('mongoose');
const Campus = require('../src/models/Campus');
const Cohort = require('../src/models/Cohort');


describe('e2e::cohorts', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should fail when campus does not exist', () => {
    const campus = new Campus({});
    const cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: campus._id,
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

  it('should fail when generation does not exist', async () => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    await campus.save();

    const cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: campus._id,
      program: 'bc',
      track: 'core',
      name: 'am',
      generation: 9,
      start: new Date(),
      end: new Date(),
    });

    return cohort.save()
      .catch(err => expect(err.message).toBe('Generation does not exist'));
  });

  it('should create common core cohort for a given generation', async () => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    const admissionCohort = new Cohort({
      slug: 'lim-2017-08-pre-core-am',
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    await campus.save();
    await admissionCohort.save();

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

  it('should create admission cohort (new generation) for new campus', async () => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    await campus.save();

    const cohort = new Cohort({
      slug: 'lim-2017-09-pre-core-am',
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      generation: 9,
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

  it('should create admission cohort (new generation) for existing campus', async () => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    const prevAdmissionCohort = new Cohort({
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    await campus.save();
    await prevAdmissionCohort.save();

    const cohort = new Cohort({
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      generation: 0,
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
        return Cohort.find({ generation: cohort.generation });
      })
      .then((docs) => {
        expect(Array.isArray(docs)).toBe(true);
        expect(docs.length).toBe(1);
        expect(`${docs[0]._id}`).toBe(`${cohort._id}`);
      });
  });

  it('should create L4B cohort', async () => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    await campus.save();

    const cohort = new Cohort({
      campus: campus._id,
      program: 'l4b',
      track: 'business',
      name: 'alicorp',
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
