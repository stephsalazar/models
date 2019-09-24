module.exports = (conn) => {
  const CohortMembershipSchema = new conn.Schema({
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'coach', 'admin'],
      required: true,
    },
    // createdAt??
    // status??? (active, dropout, expelled??)
    // ...
  }, { collection: 'cohort_memberships' });

  return CohortMembershipSchema;
};
