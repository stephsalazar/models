const mongoose = require('mongoose');
const { ReviewQuestion } = require('../')(mongoose);

describe('ReviewerQuestion', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await ReviewQuestion.createIndexes();
  });

  it('should fail with missing props', () => {
    const doc = new ReviewQuestion();
    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when type is unknown', () => {
    const doc = new ReviewQuestion({
      i18nId: 'dropout',
      type: 'other',
      visibility: 'public',
      options: ['foo', 'bar'],
    });

    return doc.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when visibility is unknown', () => {
    const reviewQuestion = new ReviewQuestion({
      i18nId: 'dropout',
      type: 'open',
      visibility: 'other',
    });

    return reviewQuestion.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const reviewQuestion = new ReviewQuestion({
      i18nId: 'dropout',
      type: 'multipleChoice',
      visibility: 'private',
      options: ['foo', 'bar'],
    });

    return reviewQuestion.save()
      .then((result) => {
        const {
          _id,
        } = result.toJSON();
        return ReviewQuestion.findById(_id);
      })
      .then((doc) => {
        expect(`${doc._id}`).toBe(`${reviewQuestion._id}`);
        expect(`${doc.i18nId}`).toBe(`${reviewQuestion.i18nId}`);
        expect(`${doc.type}`).toBe(`${reviewQuestion.type}`);
      });
  });
});
