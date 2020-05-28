const mongoose = require('mongoose/browser');
const { ExperimentIterationSchema } = require('../../')(mongoose);

describe('ExperimentIterationSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ExperimentIterationSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate document with valid data whith minimal data', () => {
    const doc = new mongoose.Document({
      version: '2',
    }, ExperimentIterationSchema);
    return doc.validate();
  });
});
