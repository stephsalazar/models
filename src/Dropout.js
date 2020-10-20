module.exports = (conn, DropoutSchema) => {
  DropoutSchema.pre('save', function (next) {
    const { User } = conn.models;

    User.findById(this.user)
      .then((user) => {
        if (!user) {
          return next(new Error('user does not exist'));
        }
        return next();
      })
      .catch(next);
  });


  const Dropout = conn.model('Dropout', DropoutSchema);

  return Dropout;
};
