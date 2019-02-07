const mongoose = require('mongoose');
const ProjectFeedback = require('../src/models/ProjectFeedback');


describe('e2e::projectsFeedback', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should fail when missing props', () => {
    const projectFeedback = new ProjectFeedback({
      projectid: 'cipher',
      cohortid: 'lim-2019-01-bc-js-09',
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: 'xxxx',
      createdBy: 'lupo',
    });

    return projectFeedback.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it.only('should ...', () => {
    const projectJson = {
      projectid: 'cipher',
      cohortid: 'lim-2019-01-bc-js-09',
      uid: 'xxxxxxxxxxxxxxxxxxxx',
      reviewerSurvey: 'xxxx',
      createdBy: 'lupo',
      rubric: '2',
      rubricResults: {
        completion: 3,
        selfLearning: 2,
      },
    };
    const projectFeedback = new ProjectFeedback(projectJson);

    return projectFeedback.save()
      .then((result) => {
        const updatedProps = {
          reviewerSurveyResults: { perception: 'foo...' },
        };
        const { _id, createdAt, ...obj } = result.toJSON();
        expect(_id.constructor.name).toBe('ObjectID');
        expect(result.createdAt instanceof Date).toBe(true);
        expect(obj).toMatchSnapshot();
        // projectFeedback.reviewerSurveyResults = { perception: 'foo...' };
        // return projectFeedback.save();
        // return ProjectFeedback.findByIdAndUpdate(result._id, updatedProps);
        return projectFeedback.update(updatedProps);
      })
      .then((updateResult) => {
        expect(updateResult).toMatchSnapshot();
        return ProjectFeedback.find({
          projectid: projectJson.projectid,
          cohortid: projectJson.cohortid,
        }).exec();
      })
      .then((docs) => {
        expect(Array.isArray(docs)).toBe(true);
        expect(docs.length).toBe(1);
        expect(`${docs[0].toJSON()._id}`).toBe(`${projectFeedback.toJSON()._id}`);
      });
  });
});
