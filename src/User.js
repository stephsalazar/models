const mongoosePaginate = require('mongoose-paginate');

module.exports = (conn, UserSchema) => {
  UserSchema.plugin(mongoosePaginate);
  return conn.model('User', UserSchema);
};
