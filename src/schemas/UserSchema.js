//
// # UserSchema
//
// The `UserSchema` describes "user objects", which hold info common to all
// users in the system (students, staff, recruiters, ...).
//
// User documents make reference to a Firebase user id, as authentication is
// handled using Firebase Auth.
//
// Indexes:
//
// * `uid`: _unique_
// * `email`: _unique_
// * `email`, `name`, `github`, `linkedin`, `roles`: _text_
//
// Migration notes:
//
// Job placement stuff has been moved to separate collections.
//
// Fields managed in LMS Settings page:
//
// * `portfolio`, `aboutMe`, `available`, `recommendedAs`, `englishLevel`
//   are now in`GraduateProfileSchema`
// * `githubProjects` is now in `GraduateProfileProjectSchema`
//
// Fields menaged in cohort users admin page:
//
// * `lifeSkills` are now in `GraduateProfileLifeSkillSchema`
// * `recommendations` are now in `GraduateProfileEndorsementSchema`
//
const AcademicProfileSchema = require('./AcademicProfileSchema');

module.exports = (conn) => {
  const UserSchema = new conn.Schema({
    // `uid`: the user's Firebase user id. This is mainly used to link auth user
    // to user doc stored in MongoDB.
    uid: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    name: { // should it be required??
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    // use common `locale`???
    locale: {
      type: String,
      required: false,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    // `roles`: one can be admin AND trainingManager, for example.
    roles: [{
      type: String,
      enum: [
        // 'student',
        'admin',
        // 'trainingManager',
        // 'jobPlacement',
        // 'coach',
        // 'alumnaeManager',
        // 'finances',
      ],
    }],
    // `signupCohort` is a cohort slug (old firestore cohort ids). This
    // represents the cohort the user "applied" to when signing up.
    // Not sure if this gets updated if a user re-applies to a future cohort.
    // NOTE: Deprecated???
    signupCohort: {
      type: String,
      trim: true,
    },
    academicProfile: {
      default: {},
      type: AcademicProfileSchema(conn),
    },
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });


  // Wildcard text index to match any string field in a user document
  // NOTE: do we need to index al ALL text fields??
  // UserSchema.index({ '$**': 'text' });
  UserSchema.index({
    email: 'text',
    name: 'text',
    github: 'text',
    linkedin: 'text',
    roles: 'text',
  });


  return UserSchema;
};
