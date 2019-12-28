module.exports = (conn) => {
  const OrganizationSchema = new conn.Schema({
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
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
    address: {
      type: String,
      trim: true,
    },
  });

  return OrganizationSchema;
};
