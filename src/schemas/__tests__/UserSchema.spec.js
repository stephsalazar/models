const mongoose = require('mongoose/browser');
const { UserSchema } = require('../')(mongoose);

describe('UserSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, UserSchema);
    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should pass validation when at least uid and email', () => {
    const doc = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);
    return doc.validate();
  });
});
