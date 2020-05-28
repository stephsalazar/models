const mongoose = require('mongoose/browser');
const { ExperimentSchema } = require('../../')(mongoose);

describe('ExperimentSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ExperimentSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate document with valid data whith minimal data', () => {
    const doc = new mongoose.Document({
      uid: '45orQ7aPbbPvF2fvMgbA1TsTFPo2',
      createdBy: mongoose.Types.ObjectId('5ca30d9cdd9c6f29c7d7b591'),
      slug: 'text',
      name: 'text',
      description: 'prueba text',
    }, ExperimentSchema);
    return doc.validate();
  });

  it('should validate document with valid data whith full data', () => {
    const doc = new mongoose.Document({
      uid: '45orQ7aPbbPvF2fvMgbA1TsTFPo2',
      createdBy: mongoose.Types.ObjectId('5ca30d9cdd9c6f29c7d7b591'),
      slug: 'text',
      name: 'text',
      description: 'prueba text',
      active: false,
      lastVersion: 2,
    }, ExperimentSchema);
    return doc.validate();
  });
});
