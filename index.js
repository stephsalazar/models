const schemas = require('schemas');
const Campus = require('./src/Campus');
const Cohort = require('./src/Cohort');
const CohortMembership = require('./src/CohortMembership');
const CohortPlatziCourse = require('./src/CohortPlatziCourse');
const CohortProject = require('./src/CohortProject');
const CohortTopic = require('./src/CohortTopic');
const CohortTopicSettings = require('./src/CohortTopicSettings');
const GraduateProfile = require('./src/GraduateProfile');
const GraduateProfileEndorsement = require('./src/GraduateProfileEndorsement');
const GraduateProfileLifeSkill = require('./src/GraduateProfileLifeSkill');
const GraduateProfileProject = require('./src/GraduateProfileProject');
const Organization = require('./src/Organization');
const Project = require('./src/Project');
const ProjectFeedback = require('./src/ProjectFeedback');
const ReviewerSurvey = require('./src/ReviewerSurvey');
const Topic = require('./src/Topic');
const TopicUnit = require('./src/TopicUnit');
const TopicUnitPart = require('./src/TopicUnitPart');
const User = require('./src/User');


module.exports = (conn) => {
  const {
    CampusSchema,
    CohortSchema,
    CohortMembershipSchema,
    CohortPlatziCourseSchema,
    CohortProjectSchema,
    CohortTopicSchema,
    CohortTopicSettingsSchema,
    GraduateProfileSchema,
    GraduateProfileEndorsementSchema,
    GraduateProfileLifeSkillSchema,
    GraduateProfileProjectSchema,
    OrganizationSchema,
    ProjectSchema,
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    UserSchema,
  } = schemas(conn);

  return {
    Campus: Campus(conn, CampusSchema),
    Cohort: Cohort(conn, CohortSchema),
    CohortMembership: CohortMembership(conn, CohortMembershipSchema),
    CohortPlatziCourse: CohortPlatziCourse(conn, CohortPlatziCourseSchema),
    CohortProject: CohortProject(conn, CohortProjectSchema),
    CohortTopic: CohortTopic(conn, CohortTopicSchema),
    CohortTopicSettings: CohortTopicSettings(conn, CohortTopicSettingsSchema),
    Organization: Organization(conn, OrganizationSchema),
    Project: Project(conn, ProjectSchema),
    ReviewerSurvey: ReviewerSurvey(conn, ReviewerSurveySchema),
    GraduateProfile: GraduateProfile(conn, GraduateProfileSchema),
    GraduateProfileEndorsement: GraduateProfileEndorsement(conn, GraduateProfileEndorsementSchema),
    GraduateProfileProject: GraduateProfileProject(conn, GraduateProfileProjectSchema),
    GraduateProfileLifeSkill: GraduateProfileLifeSkill(conn, GraduateProfileLifeSkillSchema),
    ProjectFeedback: ProjectFeedback(conn, ProjectFeedbackSchema),
    Topic: Topic(conn, TopicSchema),
    TopicUnit: TopicUnit(conn, TopicUnitSchema),
    TopicUnitPart: TopicUnitPart(conn, TopicUnitPartSchema),
    User: User(conn, UserSchema),
    CampusSchema,
    CohortSchema,
    CohortMembershipSchema,
    CohortPlatziCourseSchema,
    CohortProjectSchema,
    CohortTopicSchema,
    CohortTopicSettingsSchema,
    GraduateProfileSchema,
    GraduateProfileEndorsementSchema,
    GraduateProfileLifeSkillSchema,
    GraduateProfileProjectSchema,
    OrganizationSchema,
    ProjectSchema,
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    UserSchema,
  };
};
