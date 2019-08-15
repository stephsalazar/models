const mongoose = require('mongoose');
const { ReviewerSurvey, ReviewQuestion } = require('../')(mongoose);

describe('ReviewerSurvey', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await ReviewerSurvey.createIndexes();
  });

  it('should fail with missing props', () => {
    const reviewerSurvey = new ReviewerSurvey();
    return reviewerSurvey.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail when reviewQuestion is not a valid ObjectId', () => {
    const reviewerSurvey = new ReviewerSurvey({
      questions: ['foo'],
      version: '2.0.0',
    });

    return reviewerSurvey.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail when reviewQuestion does not exist', () => {
    const question = new ReviewQuestion();
    const reviewerSurvey = new ReviewerSurvey({
      questions: [question._id],
      version: '2.0.0',
    });

    return reviewerSurvey.save()
      .catch((err) => {
        expect(err.message).toBe('ReviewQuestion does not exist');
      });
  });

  it('should be able to query reviewerSurveys latest version', async () => {
    const reviewQuestion = new ReviewQuestion({
      i18nId: 'dropout',
      type: 'open',
      visibility: 'public',
    });

    const reviewerSurvey1 = new ReviewerSurvey({ questions: [reviewQuestion._id], version: '1.0.0' });
    const reviewerSurvey2 = new ReviewerSurvey({ questions: [reviewQuestion._id], version: '2.0.0' });

    await reviewQuestion.save();

    return reviewerSurvey1.save()
      .then(() => reviewerSurvey2.save())
      .then(() => ReviewerSurvey.findLatest())
      .then(() => ReviewerSurvey.findLatest())
      .then((doc) => {
        expect(`${doc[0]._id}`).toBe(`${reviewerSurvey2._id}`);
        expect(doc[0].latestVersion).toBe(reviewerSurvey2.version);
      });
  });

  it('should passing', async () => {
    const reviewQuestion = new ReviewQuestion({
      i18nId: 'dropout',
      type: 'open',
      visibility: 'public',
    });

    const reviewerSurvey = new ReviewerSurvey({
      questions: [reviewQuestion._id],
      version: '2.0.0',
    });

    await reviewQuestion.save();

    return reviewerSurvey.save()
      .then((result) => {
        const {
          _id,
        } = result.toJSON();
        return ReviewerSurvey.findById(_id);
      })
      .then((doc) => {
        expect(`${doc._id}`).toBe(`${reviewerSurvey._id}`);
      });
  });
});
