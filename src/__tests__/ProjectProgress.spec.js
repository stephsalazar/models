const mongoose = require('mongoose');
const {
  Campus,
  Cohort,
  CohortProject,
  CohortMembership,
  User,
  ProjectProgress,
  Project,
} = require('../..')(mongoose);


describe('ProjectProgress', () => {
  let campus;
  let cohort;
  let project;
  let user;

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
    await CohortProject.createIndexes();
    await CohortMembership.createIndexes();
    await User.createIndexes();
    await Project.createIndexes();

    project = new Project({
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.0.0',
      parserVersion: '1.1.1',
      createdAt: new Date(),
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      track: 'js',
      skills: {},
    });

    campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: campus._id,
      program: 'bc',
      track: 'core',
      name: 'am',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    await campus.save();
    await cohort.save();
    await user.save();
    await project.save();
  });

  it('should fail validation when missing fields are provided', () => {
    const doc = new ProjectProgress();

    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohortProject or cohortMembership not ObjecId', () => {
    const doc = new ProjectProgress({
      cohortProject: 'cohortProject._id',
      cohortMembership: 'cohortMembership._id',
      createdAt: new Date(),
    });

    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohortProject does not exist', async () => {
    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
      role: 'student',
    });

    const cohortProject = new CohortProject();

    const doc = new ProjectProgress({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdAt: new Date(),
    });

    await cohortMembership.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('CohortProject does not exist');
      });
  });

  it('should fail when cohortMembership does not exist', async () => {
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    const cohortMembership = new CohortMembership();
    const doc = new ProjectProgress({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdAt: new Date(),
    });

    await cohortProject.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('CohortMembership does not exist');
      });
  });

  it('should save successfully with appropriate fields', async () => {
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    const cohortMembership = new CohortMembership({
      cohort: cohort._id,
      user: user._id,
      role: 'student',
    });

    const doc = new ProjectProgress({
      cohortProject: cohortProject._id,
      cohortMembership: cohortMembership._id,
      createdAt: new Date(),
    });

    await cohortProject.save();
    await cohortMembership.save();

    return doc.save()
      .then((result) => {
        expect(`${result.cohortProject}`).toBe(`${cohortProject._id}`);
        expect(`${result.cohortMembership}`).toBe(`${cohortMembership._id}`);
      })
      .catch(err => expect(err.errors).toMatchSnapshot());
  });
});
