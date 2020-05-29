const mongoose = require('mongoose');
const { Experiment } = require('../../')(mongoose);

describe('Experiment', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should fail with missing props', () => {
    const experiment = new Experiment();
    return experiment.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail when experiment has fields missing', () => {
    const experiment = new Experiment({
      uid: '45orQ7aPbbPvF2fvMgbA1TsTFPo2',
      createdBy: mongoose.Types.ObjectId('5ca30d9cdd9c6f29c7d7b591'),
      slug: 'text',
      name: 'text',
    });
    return experiment.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const experiment = new Experiment({
      uid: '45orQ7aPbbPvF2fvMgbA1TsTFPo2',
      createdBy: mongoose.Types.ObjectId('5ca30d9cdd9c6f29c7d7b591'),
      slug: 'text',
      name: 'text',
      description: 'prueba text',
    });

    return experiment.save()
      .then((result) => {
        expect(typeof result).toBe('object');
        expect(result.name).toBe(experiment.name);
      });
  });
});
