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
    // the student code is create when applicants are admitted and It's generate with these info,
    // sede(LIM), generation(018) and number(012) according of the quanty(50)
    // for example: "LIM018012"
    studentCode: {
      type: String,
      required: true,
    },
    // The way a student leaves the bootcamp, for example
    // "invitedToLeave", she is invited to leave literally
    // "dropout", she leaves voluntarily
    reason: {
      type: String,
      required: true,
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
    },
  }, { collection: 'dropouts', timestamps: true });
  return DropoutSchema;
};
