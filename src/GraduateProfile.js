module.exports = (conn, GraduateProfileSchema) => {
  GraduateProfileSchema.virtual('endorsements', {
    ref: 'GraduateProfileEndorsement',
    localField: 'user',
    foreignField: 'user',
  });

  return conn.model(
    'GraduateProfile',
    GraduateProfileSchema,
  );
};
