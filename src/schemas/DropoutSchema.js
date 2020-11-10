module.exports = (conn) => {
  const DropoutSchema = new conn.Schema({
    campus: {
      type: String,
      required: true,
      uppercase: true,
    },
    cohortMembership: {
      type: conn.Schema.Types.ObjectId,
      ref: 'cohortMembership',
      required: true,
    },
    cohort: { // LIM007
      type: String,
      required: true,
      uppercase: true,
    },
    // It is only need to consider when migrating old data
    track: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    signUpCampus: {
      type: String,
      required: true,
    },
    // the date when a student leaves the bootcamp
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // the Project in which a student leaves the bootcamp, for example: "Cipher", "Data-love"
    project: {
      type: String,
    },
    // the stage in which a student leaves the bootcamp, for example: 0, 1
    stage: {
      type: Number,
      required: true,
    },
    // it's created when an applicant is admitted.
    // example: "LIM018012"
    // LIM = campus, 018 = generation, 012 = incremental number
    studentCode: {
      type: String,
      required: true,
    },
    // the way a student leaves the bootcamp, for example
    reason: {
      type: String,
      required: true,
      enum: [
        'dropout',
        'invitedToLeave',
        'changeCohort',
        'noShow',
      ],
    },
    reasonDetail: {
      type: String,
      required: true,
    },
    // The bootcamp team's observations about the student
    notes: {
      type: String,
      required: true,
    },
    // Is the bootcamp team sad because of the dropout? true or false
    isStaffSad: {
      type: Boolean,
      required: true,
    },
    covidRelated: {
      type: String,
      required: true,
    },
  }, { collection: 'dropouts', timestamps: true });
  return DropoutSchema;
};
