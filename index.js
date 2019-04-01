const schemas = require('schemas');
const Campus = require('./src/Campus');
const CohortMembership = require('./src/CohortMembership');
const Cohort = require('./src/Cohort');
const Organization = require('./src/Organization');
const Project = require('./src/Project');
const ProjectFeedback = require('./src/ProjectFeedback');
const ReviewerSurvey = require('./src/ReviewerSurvey');
const GraduateProfile = require('./src/GraduateProfile');
const GraduateProfileEndorsement = require('./src/GraduateProfileEndorsement');
const GraduateProfileProject = require('./src/GraduateProfileProject');
const GraduateProfileLifeSkill = require('./src/GraduateProfileLifeSkill');
const Topic = require('./src/Topic');
const User = require('./src/User');


module.exports = (conn) => {
  const {
    CampusSchema,
    CohortMembershipSchema,
    CohortSchema,
    OrganizationSchema,
    ProjectSchema,
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    GraduateProfileSchema,
    GraduateProfileEndorsementSchema,
    GraduateProfileProjectSchema,
    GraduateProfileLifeSkillSchema,
    TopicSchema,
    UserSchema,
  } = schemas(conn);

  return {
    Campus: Campus(conn, CampusSchema),
    CohortMembership: CohortMembership(conn, CohortMembershipSchema),
    Cohort: Cohort(conn, CohortSchema),
    Organization: Organization(conn, OrganizationSchema),
    Project: Project(conn, ProjectSchema),
    ReviewerSurvey: ReviewerSurvey(conn, ReviewerSurveySchema),
    GraduateProfile: GraduateProfile(conn, GraduateProfileSchema),
    GraduateProfileEndorsement: GraduateProfileEndorsement(conn, GraduateProfileEndorsementSchema),
    GraduateProfileProject: GraduateProfileProject(conn, GraduateProfileProjectSchema),
    GraduateProfileLifeSkill: GraduateProfileLifeSkill(conn, GraduateProfileLifeSkillSchema),
    ProjectFeedback: ProjectFeedback(conn, ProjectFeedbackSchema),
    Topic: Topic(conn, TopicSchema),
    User: User(conn, UserSchema),
    CampusSchema,
    CohortMembershipSchema,
    CohortSchema,
    ProjectSchema,
    ReviewerSurveySchema,
    ProjectFeedbackSchema,
    TopicSchema,
    UserSchema,
  };
};
