module.exports = (conn) => {
  const TagSchema = new conn.Schema({
    i18nId: {
      type: String,
      required: true,
      index: true,
    },
  });

  TagSchema.index({
    i18nId: 'text',
  });

  return TagSchema;
};
