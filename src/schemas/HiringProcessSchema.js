module.exports = (conn) => {
  const HiringProcessSchema = new conn.Schema({
    opportunity: {
      type: conn.Schema.Types.ObjectId,
      ref: 'JobOpportunity',
      required: true,
    },
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: ' User',
      required: true,
    },
    organization: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    createDate: {
      type: Date,
      required: true,
    },
    acceptedDate: {
      type: Date,
    },
    createProposalDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    salary: {
      type: Number,
    },
    active: {
      type: Boolean,
      required: true,
    },
  }, { collection: 'hiring_processes' });

  HiringProcessSchema.index(
    {
      opportunity: 1,
      user: 1,
    }, {
      unique: true,
    },
  );

  return HiringProcessSchema;
};
