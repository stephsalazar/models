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
      enum: ['student', 'coach', 'instructor', 'admin', 'hr'],
      required: true,
    },
    state: {
      type: String,
      default: 'active',
      enum: ['active', 'dropout'],
    },
  }, { collection: 'cohort_memberships', timestamps: true });

  return CohortMembershipSchema;
};
