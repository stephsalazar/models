const { slug } = require('./common');
//
// # OrganizationSchema
//
// This schema describes "organizations objects”,  which hold company´s info.
//
// Example new organization:
// {
//   hubspotId: '440521902',
//   slug: 'laboratoria',
//   name: 'Laboratoria',
//   website: 'www.laboratoria.la',
//   domain: 'laboratoria.la',
//   industry: 'EDUCATION',
//   category: 'SMALL_AND_MEDIUM_SIZED_BUSINESS',
//   subcategory: 'STARTUP',
//   size: 'SMALL',
//   logo: 'https://v.fastcdn.co/u/cf943cfe/27418802-0-Laboratoria-Logo-RGB.png',
// }

module.exports = (conn) => {
  const OrganizationSchema = new conn.Schema({
    // `hubspotId`: the organization's HubSpot id.
    hubspotId: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },
    slug,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    // It refers to the economic activity carried out
    industry: {
      type: String,
      enum: [
        'AGRICULTURE',
        'BANKING',
        'BENEFIT_SERVICES',
        'COMMUNITY',
        'CONSTRUCTION',
        'CONSULTING',
        'EDUCATION',
        'ENERGY',
        'ENTERTAINMENT',
        'FOOD',
        'FINANCIAL',
        'GOVERNMENT',
        'TRADE_UNION',
        'HEALTH',
        'INSURANCE',
        'LEGAL',
        'LOGISTICS',
        'MANUFACTURING',
        'MEDIA_OUTLETS',
        'MASS_CONSUMPTION',
        'MINIG',
        'MULTILATERAL',
        'OIL_INDUSTRY',
        'PHARMACEUTICAL/LABORATORY',
        'PUBLIC_SECTOR',
        'PUBLIC_SERVICES',
        'REAL_STATE',
        'RETAIL',
        'TALENT',
        'TECHNOLOGY',
        'TELECOMMUNICATIONS',
        'TRANSPORT',
        'TOURISM',
      ],
    },
    // Classification of your technological development
    category: {
      type: String,
      enum: [
        'DIGITAL_TRANSFORMATION',
        'SOFTWARE_FACTORY',
        'AGENCY',
        'SMALL_AND_MEDIUM_SIZED_BUSINESS',
        'HIGH_TECH',
      ],
    },
    // Subclassification depending on the category
    subcategory: {
      type: String,
      enum: [
        'EARLY_STAGE_CORPORATION', // category: 'digital transformation'
        'IN-DEVELOP_CORPORATION', // category: 'digital transformation'
        'MATURE_CORPORATION', // category: 'digital transformation'
        'TECH_CONSULTING_FIRM', // category: 'software factory'
        'SOFTWARE_BOUTIQUE', // category: 'software factory'
        'UX/UI_AGENCY', // category: 'agency'
        'DIGITAL_AGENCY', // category: 'agency'
        'TRADITIONAL_BUSINESS', // category: 'small and medium sized business'
        'STARTUP', // category: 'small and medium sized business'
      ],
    },
    size: {
      type: String,
      enum: [
        'SMALL', // 50 - 500 employees
        'MEDIUM', // 500 - 1,000 employees
        'BIG', // 1,000 - 10,000 employees
        'CORPORATE', // 10,000+ employees
      ],
    },
    // `logo`: url of a organization logo
    logo: {
      type: String,
    },
  });

  return OrganizationSchema;
};
