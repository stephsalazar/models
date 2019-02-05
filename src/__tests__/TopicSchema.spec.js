const mongoose = require('mongoose');
const TopicSchema = require('../TopicSchema');


describe('TopicSchema', () => {
  it('should ...', (done) => {
    const TopicModel = mongoose.model('Topic', TopicSchema);
    const topic = new TopicModel({ name: null });
    topic.validate((err) => {
      expect(err.name).toBe('ValidationError');
      expect(err.errors).toMatchSnapshot();
      done();
    });
  });
});
