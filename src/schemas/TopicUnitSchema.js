const { slug } = require('./common');


module.exports = (conn) => {
  const TopicUnitSchema = new conn.Schema({
    topic: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    slug: { ...slug, unique: false },
    title: { type: String, required: true },
    bonus: { type: Boolean, required: true, default: false }, // ???
    description: { type: String }, // Should this be required???
    stats: {
      duration: { type: Number, required: true },
      durationString: { type: String, required: true },
      exerciseCount: { type: Number, required: true },
      partCount: { type: Number, required: true },
    },
    order: { type: Number },
  }, { collection: 'topic_units' });

  TopicUnitSchema.index({ topic: 1, slug: 1 }, { unique: true });

  return TopicUnitSchema;
};
