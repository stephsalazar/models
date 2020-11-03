module.exports = (conn) => {
  const OrganizationMembershipSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    organization: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    phone: {
      type: String,
    },
    position: {
      type: String,
    },
  }, {
    collection: 'organization_memberships',
    timestamps: true,
  });
  return OrganizationMembershipSchema;
};
