module.exports = (conn) => {
  const JobOpportunitySchema = new conn.Schema({
    employer: {
      type: conn.Schema.Types.ObjectId,
      ref: 'OrganizationMembership',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    campus: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Campus',
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Front-end Developer', 'Prototyper', 'UX Designer'],
    },
    hireType: {
      type: String,
      enum: ['payroll', 'independent'],
    },
    scheduleType: {
      type: String,
      enum: ['full-time', 'part-time'],
    },
    salaryRange: {
      type: String,
      required: true,
    },
    tentativeStart: {
      type: Date,
      require: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  }, { collection: 'job_opportunities' });
  return JobOpportunitySchema;
};
