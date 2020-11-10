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
    active: {
      type: Boolean,
      default: true,
    },
    // This field refers to the Dropout scheme, which details why the student is
    // dropping out
    dropoutReason: {
      type: String,
      enum: [
        'dropout',
        'invitedToLeave',
        'changeCohort',
        'noShow',
      ],
    },
    // it's created when an applicant is admitted.
    // example: "LIM018012"
    // LIM = campus, 018 = generation, 012 = incremental number
    studentCode: {
      type: String,
    },
    // it's created when we want to refer to the pre-school cohort. Example if a
    // student is in a preAdmission LIM012 cohort, it means that the previousCohort
    // would be LIM012 of admission.
    previousCohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
    },
  }, { collection: 'cohort_memberships', timestamps: true });

  return CohortMembershipSchema;
};
