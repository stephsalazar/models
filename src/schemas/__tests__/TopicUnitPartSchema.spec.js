const mongoose = require('mongoose/browser');
const { JSDOM } = require('jsdom');
const { TopicUnitSchema, TopicUnitPartSchema } = require('../')(mongoose, (new JSDOM()).window.document);
const babelTopicJson = require('./fixtures/topics/babel');

describe('TopicUnitPartSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, TopicUnitPartSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when type read and missing body', () => {
    const doc = new mongoose.Document({
      slug: '00-opening',
      duration: 5,
      durationString: '5min',
      format: 'self-paced',
      type: 'read',
      title: 'Opening',
    }, TopicUnitPartSchema);

    return doc.validate()
      .catch(err => expect(err.message).toBe('Body is required for part type read'));
  });

  it('should pass validation when type quiz and missing body', () => {
    const unit = new mongoose.Document({}, TopicUnitSchema);
    const doc = new mongoose.Document({
      unit: unit._id,
      slug: '01-quiz',
      duration: 10,
      durationString: '10min',
      format: 'self-paced',
      type: 'quiz',
      title: 'Quiz 1',
    }, TopicUnitPartSchema);

    return doc.validate();
  });

  it('should pass validation when type practice and missing body', () => {
    const unit = new mongoose.Document({}, TopicUnitSchema);
    const doc = new mongoose.Document({
      unit: unit._id,
      slug: '02-exercises',
      duration: 10,
      durationString: '10min',
      format: 'self-paced',
      type: 'practice',
      title: 'Exercises',
    }, TopicUnitPartSchema);

    return doc.validate();
  });

  it('should pass validation when type practice and empty body', () => {
    const unit = new mongoose.Document({}, TopicUnitSchema);
    const doc = new mongoose.Document({
      unit: unit._id,
      slug: '02-exercises',
      duration: 10,
      durationString: '10min',
      format: 'self-paced',
      type: 'practice',
      title: 'Exercises',
      body: '',
    }, TopicUnitPartSchema);

    return doc.validate();
  });

  it('should pass validation when type read and has body', () => {
    const body = 'Blah <h1>bla<span>h.*</span>-</h1>+_ blah...';
    const unit = new mongoose.Document({}, TopicUnitSchema);
    const doc = new mongoose.Document({
      unit: unit._id,
      slug: '00-opening',
      duration: 5,
      durationString: '5min',
      format: 'self-paced',
      type: 'read',
      title: 'Opening',
      body,
    }, TopicUnitPartSchema);
    expect(doc.validateSync()).toBe(undefined);
    expect(doc.body).toBe(body);
    expect(doc.searchableBody).toBe('Blah blah.*-+_ blah...');
  });

  it('should validate existing topic json', () => {
    const unit = new mongoose.Document({}, TopicUnitSchema);
    const parts = Object.values(babelTopicJson.syllabus).reduce(
      (memo, unitJson) => memo.concat(
        Object.keys(unitJson.parts).map(slug => ({
          unit: unit._id,
          slug,
          ...unitJson.parts[slug],
        })),
      ),
      [],
    );
    return Promise.all(parts.map((partJson) => {
      const part = new mongoose.Document(partJson, TopicUnitPartSchema);
      return part.validate();
    }));
  });
});
