module.exports = (conn) => {
  const TagSchema = new conn.Schema({
    text: {
      type: String,
      required: true,
      index: true,
    },
  });

  TagSchema.index({
    text: 'text',
  });

  return TagSchema;
};
