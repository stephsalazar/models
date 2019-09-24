// Endorsements

module.exports = (conn) => {
  const EndorsementSchema = new conn.Schema({
    text: {
      type: String,
      required: true,
      index: true,
    },
  });

  EndorsementSchema.index({
    text: 'text',
  });

  return EndorsementSchema;
};
