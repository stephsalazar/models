module.exports = (conn) => {
  const TeamSchema = new conn.Schema({
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
  }, { collection: 'teams', timestamps: true });

  return TeamSchema;
};
