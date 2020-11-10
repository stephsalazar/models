module.exports = (conn) => {
  const DropoutSchema = new conn.Schema({
    campus: {
      type: String,
      required: true,
      uppercase: true,
    },
    // Example: LIM007
    cohort: {
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
      uppercase: true,
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
    // the stage indicates the order of the project in which the student left the bootcamp
    // for example: if 0 means that the student did not show up at the bootcamp,
    //  1 means that the student left the bootcamp in her first project
    // as the students do not all start with the same project, with this field we
    //  want to know the order in which they started the bootcamp
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
    staffSad: {
      type: Boolean,
      required: true,
    },
    covidRelated: {
      type: String,
      required: true,
      enum: [
        'yes',
        'no',
        'do not know',
      ],
    },
  }, { collection: 'dropouts', timestamps: true });

  DropoutSchema.index({ email: 1, cohort: 1 }, { unique: true });

  return DropoutSchema;
};
