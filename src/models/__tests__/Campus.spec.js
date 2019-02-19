const mongoose = require('mongoose');
const { CampusSchema } = require('schemas')(mongoose);
const Campus = require('../Campus')(mongoose, CampusSchema);


describe('Campus', () => {
  it('should validate open question', (done) => {
    const campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      // active: true,
    });
    campus.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
