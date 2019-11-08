const mongoosePaginate = require('mongoose-paginate');

module.exports = (conn, UserSchema) => {
  UserSchema.plugin(mongoosePaginate);
  UserSchema.virtual('graduateProfile', {
    ref: 'GraduateProfile',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
  });

  return conn.model('User', UserSchema);
};
