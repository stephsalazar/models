//
// # GraduateProfileLifeSkillSchema (deprecated)
//
// This schema describes `lifeSkills` "endorsed" by someone on Laboratoria's
// team.
//
// This data is managed by cohort admins via the cohort users management page.
//
// NOTE: This schema is obsolete and deprecated. It is only in the database for
// legacy and archival reasons.
//
// Indexes:
//
// * `user`: Basic index to enhance filtering by student. Note that this index
//   is NOT _unique_, which means that a given student can have many
//   `GraduateProfileLifeSkill`s.
// * `endorsedBy`: Basic index to enhance filtering by `endorsedBy`. Note that
//   this index is NOT _unique_, which means that a given can user endorse many
//   students on many skills.
// * `organization`: Basic index to enhance filtering by `organization`. Note
//   that this index is NOT _unique_.
// * `user/skill/endorsedBy`: A _unique_ compound index that ensures that a
//   given user can only endorse a given student for a given skill once.
//
// Migration notes:
//
// * `user`: Previously the _key_ in the main `user` object.
// * `endorsedBy`: Previously we had the _keys_ (uids) in the objects under each
//   of the skills two text fields (`author` and `authorLinkedin`) and now we
//   only store an ObjectId pointing to the author's `User` document in the
//   database, which in turn contains the user's name and linkedin as well as
//   other user details.
// * `organization`: Previously we had two text fields (`company` and
//   `companyUrl`) and now we store a ObjectId pointing to the organization
//   document in the new `organizations` collection, which in turn contains the
//   organization's name and url.
// * `skill`: Previously the _key_ in the `lifeSkills` object.
//
// Example old lifeSkills in Firestore:
//
// "lifeSkills": {
//   "selfLearning": {
//     "G9MyfnFrC8ViXCl3MQjX6bnqeEO2": {
//        "author": "Lupo",
//       "authorLinkedin": "lupomontero",
//       "company": "Laboratoria",
//       "companyUrl": "www.laboratoria.la"
//     }
//   }
// }
//
// Example new student profile lifeSkills:
//
// [
//   {
//     "user": "ObjectId",
//     "endorsedBy": "ObjectId",
//     "organization": "ObjectId",
//     "skill": "selfLearning"
//   }
// ]
//

module.exports = (conn) => {
  const GraduateProfileLifeSkillSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    skill: {
      type: String,
      required: true,
      enum: [
        'selfLearning',
        'problemSolving',
        'timeManagement',
        'askForHelp',
        'adaptability',
        'proactivity',
        'decisionMaking',
        'teamWork',
        'communication',
        'feedback',
        'conflictResolution',
      ],
    },
    endorsedBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    organization: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
  }, { collection: 'graduate_profile_life_skills' });

  GraduateProfileLifeSkillSchema.index(
    { user: 1, skill: 1, endorsedBy: 1 },
    { unique: true },
  );

  return GraduateProfileLifeSkillSchema;
};
