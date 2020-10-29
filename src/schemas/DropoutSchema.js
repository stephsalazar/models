module.exports = (conn) => {
  const DropoutSchema = new conn.Schema({
    city: {
      type: String,
      required: true,
    },
    cohort: {
      type: String,
      required: true,
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
    signUpCohortCity: {
      type: String,
      required: true,
    },
    // the date when a student leaves the bootcamp
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // the stage in which a student leaves the bootcamp, for example: "1st day", "project 1"
    stage: {
      type: String,
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
        'Leave the program voluntarily',
        'We invite her to leave the program',
        'She repeats - Change cohort',
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
    sad: {
      type: Boolean,
      required: true,
    },
    covidRelated: {
      type: Boolean,
      required: true,
      default: false,
    },
  }, { collection: 'dropouts', timestamps: true });
  return DropoutSchema;
};
