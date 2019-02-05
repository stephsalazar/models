const mongoose = require('mongoose');
const ProjectSchema = require('../ProjectSchema');


describe('ProjectSchema', () => {
  it('should ...', (done) => {
    const ProjectModel = mongoose.model('Project', ProjectSchema);
    const project = new ProjectModel({ name: null });
    project.validate((err) => {
      expect(err.name).toBe('ValidationError');
      expect(err.errors).toMatchSnapshot();
      done();
    });
  });
});
