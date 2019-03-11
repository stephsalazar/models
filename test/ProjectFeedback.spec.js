const mongoose = require('mongoose');
const {
  Campus,
  Cohort,
  ProjectFeedback,
  Project,
  ReviewerSurvey,
} = require('../')(mongoose);


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

const campusJSON = {
  slug: 'lim',
  name: 'Lima',
  locale: 'es-PE',
  timezone: 'America/Lima',
  active: true,
};


describe('ProjectFeedback', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await ProjectFeedback.createIndexes();
  });

  it('should fail when missing props', () => {
    const projectFeedback = new ProjectFeedback({
      project: (new Project())._id,
      cohort: (new Cohort())._id,
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: (new ReviewerSurvey())._id,
      createdBy: 'lupo',
    });

    return projectFeedback.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when project, cohort or reviewerSurvey not ObjectId', () => {
    const projectFeedback = new ProjectFeedback({
      project: 'cipher',
      cohort: 'lim-2019-01-bc-js-09',
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: 'xxxx',
      createdBy: 'lupo',
    });

    return projectFeedback.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when project does not exist', () => {
    const project = new Project();
    const cohort = new Cohort();
    const reviewerSurvey = new ReviewerSurvey();
    const projectFeedback = new ProjectFeedback({
      project: project._id,
      cohort: cohort._id,
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: reviewerSurvey._id,
      createdBy: 'lupo',
      rubric: '2',
      rubricResults: {
        completion: 3,
        selfLearning: 2,
      },
    });

    return projectFeedback.save()
      .catch(err => expect(err.message).toBe('Project does not exist'));
  });

  it('should fail when cohort does not exist', () => {
    const project = new Project(projectJSON);
    const cohort = new Cohort();
    const reviewerSurvey = new ReviewerSurvey();

    return project.save()
      .then((saveResult) => {
        expect(saveResult.slug).toBe('cipher');
        const projectFeedback = new ProjectFeedback({
          project: project._id,
          cohort: cohort._id,
          uid: 'xxxxxxxxxxxxxxxxxxxx',
          reviewerSurvey: reviewerSurvey._id,
          createdBy: 'lupo',
          rubric: '2',
          rubricResults: {
            completion: 3,
            selfLearning: 2,
          },
        });

        return projectFeedback.save()
          .then(console.log)
          .catch(err => expect(err.message).toBe('Cohort does not exist'));
      });
  });

  it('should fail when reviewerSurvey does not exist', async () => {
    const project = new Project(projectJSON);
    const campus = new Campus(campusJSON);
    const admissionCohort = new Cohort({
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      start: new Date(),
      end: new Date(),
    });
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });
    const reviewerSurvey = new ReviewerSurvey();
    const projectFeedback = new ProjectFeedback({
      project: project._id,
      cohort: cohort._id,
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: reviewerSurvey._id,
      createdBy: 'lupo',
      rubric: '2',
      rubricResults: {
        completion: 3,
        selfLearning: 2,
      },
    });

    await project.save();
    await campus.save();
    await admissionCohort.save();
    await cohort.save();

    return projectFeedback.save()
      .catch(err => expect(err.message).toBe('ReviewerSurvey does not exist'));
  });

  it('should save projectFeedback and save again with reviewerSurveyResults', async () => {
    const project = new Project(projectJSON);
    const campus = new Campus(campusJSON);
    const admissionCohort = new Cohort({
      campus: campus._id,
      program: 'pre',
      track: 'core',
      name: 'am',
      start: new Date(),
      end: new Date(),
    });
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });
    const reviewerSurvey = new ReviewerSurvey({
      questions: [
        { slug: 'foo', type: 'open' },
        { slug: 'bar', type: 'multiple-choice', options: 4 },
      ],
    });
    const projectFeedback = new ProjectFeedback({
      project: project._id,
      cohort: cohort._id,
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: reviewerSurvey._id,
      createdBy: 'lupo',
      rubric: '2',
      rubricResults: {
        completion: 3,
        selfLearning: 2,
      },
    });

    await project.save();
    await campus.save();
    await admissionCohort.save();
    await cohort.save();
    await reviewerSurvey.save();

    return projectFeedback.save()
      .then((result) => {
        expect(`${result.project}`).toBe(`${project._id}`);
        expect(`${result.cohort}`).toBe(`${cohort._id}`);
        expect(`${result.reviewerSurvey}`).toBe(`${reviewerSurvey._id}`);
        const updatedProps = {
          reviewerSurveyResults: { perception: 'foo...' },
        };
        expect(result._id.constructor.name).toBe('ObjectID');
        expect(result.createdAt instanceof Date).toBe(true);
        // projectFeedback.reviewerSurveyResults = { perception: 'foo...' };
        // return projectFeedback.save();
        // return ProjectFeedback.findByIdAndUpdate(result._id, updatedProps);
        return projectFeedback.update(updatedProps);
      })
      .then((updateResult) => {
        expect(updateResult).toMatchSnapshot();
        return ProjectFeedback
          .find({
            project: project._id,
            cohort: cohort._id,
          })
          .populate('project', 'slug')
          .populate('cohort')
          .populate('reviewerSurvey')
          .exec();
      })
      .then((docs) => {
        expect(Array.isArray(docs)).toBe(true);
        expect(docs.length).toBe(1);
        expect(`${docs[0].toJSON()._id}`).toBe(`${projectFeedback.toJSON()._id}`);
      });
  });

  // TODO: qué pasa cuando tratamos de crear un cohort de bootcamp en un cohort
  // donde no hay ningún cohort de admisión
});
