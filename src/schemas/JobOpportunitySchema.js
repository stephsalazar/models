module.exports = (conn) => {
  const JobOpportunitySchema = new conn.Schema({
    id: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    externalId: { // dealID Hubspot
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    newPosition: {
      type: Boolean,
      default: true,
    },
    location: { // Remoto?
      enum: [
        'BOG',
        'CDMX',
        'GDL',
        'LIM',
        'SCL',
        'SPL',
      ],
      required: true,
    },
    profileType: { // Hay más categorias?
      type: String,
      enum: ['Front-end Developer', 'UX Designer'],
    },
    hireType: { // Hay más categorias?
      type: String,
      enum: ['payroll', 'independent'],
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time'],
    },
    salaryRange: { // Enum?? De cada sede? String enviado desde el front?
      type: String,
      required: true,
    },
    experienceRange: { // ????
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    organizationId: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    businessUnit: { // ????
      type: String,
      required: true,
    },
    internalJobCode: { // ???
      type: String,
      required: true,
    },
    recruiterID: { // id de Hubspot Contact??? id de OrganizationMembership???
      type: String,
      required: true,
    },
  }, { collection: 'job_opportunities' }); // Ya está funcionando???
  return JobOpportunitySchema;
};
