//
// # GraduateProfileProjectSchema
//
// This schema describes de "projects" shown in student's profiles in the job
// placement app. These should not be confused with documents in the `projects`
// collection (`ProjectSchema`), which describe projects as used in our training
// programs (ie: Bootcamp).
//
// Data in this collection is manages via two different "pages":
//
// 1. Students that have been assigned to a "job placement" cohort will be able
//    to manage the projects shown in their profile from the main "Settings"
//    page.
// 2. Cohort admins can also manage each user's projects via the "cohort users"
//    admin page.
//
// Indexes:
//
// * `user`: Basic index to enhance filtering by student. Note that this
//   index is NOT _unique_, which means that a given student can have many
//   `GraduateProfileProject`s.
// * `user/name`: A _unique_ index to ensure that the same name can not be used
//   more than once per user.
//
// Migration notes:
//
// * `user`: Previously the _key_ in the main `user` object.
// * `urls`: An array of project urls, previously known as `repo` and `demo`.
// * `name`: Stays the same.
// * `description`: Stays the same.
// * `tags`: Used to be a list of comma separated strings and is now an array of
//   strings.
// * `image`: Stays the same.
// * `where`: Stays the same.
// * `date`: Stays the same.
//
// The following fields have been ignored from object in `githubProjects` array:
//
// * `id`: Number
// * `repoErrors`: ??
// * `error`: ??
// * `url`: ??
// * `license`: ??
//
// Example old githubProjects in Firestore:
//
// "githubProjects": {
//   "0": {
//     "github": "https://github.com/lupomontero/media",
//     "demo": "https://lupomontero.github.io/media/",
//     "name": "Foo",
//     "description": "La descripción del proyecto...",
//     "tags": "foo,bar,baz",
//     "image": "http://foo.bar/baz.png",
//     "where": "Laboratoria",
//     "date": "2018-11",
//     "id": 0
//   }
// }
//
// Example new student profile projects:
//
// [
//   {
//     "user": "ObjectId",
//     "name": "Foo",
//     "urls": [
//       "https://lupomontero.github.io/media/",
//       "https://github.com/lupomontero/media"
//     ],
//     "description": "La descripción del proyecto...",
//     "tags": ["foo","bar","baz"],
//     "image": "http://foo.bar/baz.png",
//     "where": "Laboratoria",
//     "date": "2018-11"
//   }
// ]
//

module.exports = (conn) => {
  const GraduateProfileProjectSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    urls: {
      type: [{
        type: String,
        required: true,
        trim: true,
      }],
      validate: v => v.length > 0,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String,
      trim: true,
    },
    // `where`: This "where" the project was built, something like a project's
    // "client" in the context of a portfolio.
    where: {
      type: String,
      trim: true,
    },
    date: {
      // type: Date,
      // default: Date.now,
      type: String,
      trim: true,
    },
  }, { collection: 'graduate_profile_projects' });

  // GraduateProfileProjectSchema.index({ '$**': 'text' });

  GraduateProfileProjectSchema.index(
    { user: 1, name: 1 },
    { unique: true },
  );

  return GraduateProfileProjectSchema;
};
