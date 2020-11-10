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
    isActive: {
      type: Boolean,
      default: true,
    },
    dropoutReason: {
      type: String,
      enum: [
        'dropout',
        'invitedToLeave',
        'changeCohort',
        'noShow',
      ],
    },
    studentCode: {
      type: String,
    },
    previousCohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
    },
  }, { collection: 'cohort_memberships', timestamps: true });

  return CohortMembershipSchema;
};
