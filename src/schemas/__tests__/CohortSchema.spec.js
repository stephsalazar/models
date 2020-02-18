const mongoose = require('mongoose/browser');
const { CohortSchema, CampusSchema } = require('../')(mongoose);

describe('CohortSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, CohortSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when unknown program', () => {
    const campus = new mongoose.Document({}, CampusSchema);
    const doc = new mongoose.Document({
      campus: campus._id,
      program: 'foo',
      track: 'js',
      name: '',
      generation: 1,
      start: new Date(),
      end: new Date(),
      publicAdmission: false,
      rubric: '2',
    }, CohortSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when slug exceed max length', () => {
    const campus = new mongoose.Document({}, CampusSchema);
    const doc = new mongoose.Document({
      slug: 'lim-2019-11-l4b-business-afphabitat-adoptando-un-mindset-digital-maxlenght-greater-than-100-characters',
      campus: campus._id,
      program: 'bc',
      track: 'js',
      name: '',
      start: new Date(),
      end: new Date(),
      publicAdmission: false,
      rubric: '2',
    }, CohortSchema);

    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when generation is missing in bootcamp cohort', () => {
    const campus = new mongoose.Document({}, CampusSchema);
    const doc = new mongoose.Document({
      campus: campus._id,
      program: 'bc',
      track: 'js',
      name: '',
      start: new Date(),
      end: new Date(),
      publicAdmission: false,
      rubric: '2',
    }, CohortSchema);

    return doc.validate()
      .catch(err => expect(err.message).toBe('Generation is required for program type bc'));
  });

  it('should fail validation when topics not array of ObjectId', () => {
    const campus = new mongoose.Document({}, CampusSchema);
    const cohortJson = {
      campus: campus._id,
      program: 'bc',
      track: 'js',
      name: 'OMG',
      generation: 1,
      start: new Date(),
      end: new Date(),
      publicAdmission: false,
      rubric: '2',
      topics: ['foo'],
    };
    const doc = new mongoose.Document(cohortJson, CohortSchema);
    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should validate good bootcamp cohort', () => {
    const campus = new mongoose.Document({}, CampusSchema);
    const doc = new mongoose.Document({
      campus: campus._id,
      program: 'bc',
      track: 'js',
      name: 'OMG',
      generation: 1,
      start: new Date(),
      end: new Date(),
      publicAdmission: false,
      rubric: '2',
    }, CohortSchema);

    return doc.validate();
  });
});
