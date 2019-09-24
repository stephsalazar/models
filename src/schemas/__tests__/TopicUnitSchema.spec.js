const mongoose = require('mongoose/browser');
const { TopicSchema, TopicUnitSchema } = require('../')(mongoose);
const babelTopicJson = require('./fixtures/topics/babel');

describe('TopicUnitSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, TopicUnitSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should pass sync validation ...', () => {
    const topic = new mongoose.Document({}, TopicSchema);
    const doc = new mongoose.Document({
      topic: topic._id,
      slug: '01-intro',
      title: 'Intro to Foo',
      stats: {
        partCount: 4,
        exerciseCount: 0,
        duration: 35,
        durationString: '35min',
      },
    }, TopicUnitSchema);
    expect(doc.validateSync()).toBe(undefined);
  });

  it('should validate existing topic json', () => {
    const topic = new mongoose.Document({}, TopicSchema);
    const units = Object.keys(babelTopicJson.syllabus).map(slug => ({
      topic: topic._id,
      slug,
      ...babelTopicJson.syllabus[slug],
    }));
    return Promise.all(units.map((unitJson) => {
      const unit = new mongoose.Document(unitJson, TopicUnitSchema);
      return unit.validate();
    }));
  });
});
