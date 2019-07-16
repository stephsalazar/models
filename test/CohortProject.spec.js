const mongoose = require('mongoose');
const {
  CohortProject,
  Cohort,
  Project,
  Campus,
} = require('../')(mongoose);

const campusJSON = {
  slug: 'lim',
  name: 'Lima',
  locale: 'es-PE',
  timezone: 'America/Lima',
  active: true,
};

const projectJSON = {
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
};

describe('CohortProject', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await CohortProject.createIndexes();
    await Cohort.createIndexes();
    await Project.createIndexes();
  });

  it('should fail when missing props', () => {
    const cohortProject = new CohortProject();
    return cohortProject.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohort or project are not ObjecIds', () => {
    const doc = new CohortProject({
      cohort: 'cohort._id',
      project: 'project._id',
    });
    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when cohort does not exist', async () => {
    const project = new Project(projectJSON);
    const doc = new CohortProject({
      project: project._id,
      cohort: (new Cohort())._id,
    });

    await project.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('Cohort does not exist');
      });
  });

  it('should fail when project does not exist', async () => {
    const campus = new Campus(campusJSON);
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });
    const doc = new CohortProject({
      cohort: cohort._id,
      project: (new Project())._id,
    });

    await campus.save();
    await cohort.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('Project does not exist');
      });
  });

  it('should save successfully with appropriate fields', () => {
    const cohort = new Cohort({});
    const project = new Project({});
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });
    return cohortProject.save()
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

    const project = new Project(projectJSON);
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    await campus.save();
    await cohort.save();
    await project.save();

    return cohortProject.save()
      .then((result) => {
        expect(`${result.project}`).toBe(`${project._id}`);
        expect(`${result.cohort}`).toBe(`${cohort._id}`);
      });
  });
});
