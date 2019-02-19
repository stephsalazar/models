const mongoose = require('mongoose');
const { CampusSchema, CohortSchema } = require('schemas')(mongoose);
const Cohort = require('../Cohort')(mongoose, CohortSchema);
const Campus = require('../Campus')(mongoose, CampusSchema);


describe('Cohort', () => {
  it('should fail validation when campus not an ObjectId', () => {
    const cohort = new Cohort({
      campus: 'lim',
      program: 'bc',
      track: 'core',
      generation: 9,
      start: new Date(),
      end: new Date(),
    });
    return cohort.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when bootcamp related cohort and no generation', () => {
    const campus = new Campus({});
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      start: new Date(),
      end: new Date(),
    });
    return cohort.validate()
      .catch(err => expect(err.message).toBe('Generation is required for program type bc'));
  });

  it('should validate campus when all good', () => {
    const campus = new Campus({});
    const cohort = new Cohort({
      campus: campus._id,
      program: 'bc',
      track: 'core',
      generation: 9,
      start: new Date(),
      end: new Date(),
    });
    return cohort.validate();
  });
});
