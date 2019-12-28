
const AcademicProfileTagSchema = require('./AcademicProfileTagSchema');
const AcademicProfileEndorsementSchema = require('./AcademicProfileEndorsementSchema');
const AcademicProfileCommentSchema = require('./AcademicProfileCommentSchema');

module.exports = (conn) => {
  const AcademicProfileSchema = new conn.Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: [AcademicProfileTagSchema(conn)],
    endorsements: [AcademicProfileEndorsementSchema(conn)],
    comments: [AcademicProfileCommentSchema(conn)],
  });

  return AcademicProfileSchema;
};
