const { Cohort } = require('../Cohort');


describe('Cohort', () => {
  it('should validate open question', (done) => {
    const cohort = new Cohort({
      campus: 'lim',
      program: 'bc',
      track: 'core',
      generation: 9,
      start: new Date(),
      end: new Date(),
    });
    cohort.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
