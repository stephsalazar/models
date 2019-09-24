const { slug } = require('./common');


module.exports = (conn, document) => {
  const TopicUnitPartSchema = new conn.Schema({
    unit: {
      type: conn.Schema.Types.ObjectId,
      ref: 'TopicUnit',
      required: true,
    },
    slug: { ...slug, unique: false },
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'read',
        'seminar',
        'workshop',
        'quiz',
        'practice',
        'other',
      ],
    },
    format: {
      type: String,
      required: true,
      enum: ['guided', 'self-paced'],
    },
    duration: { type: Number, required: true },
    // `body` is required when `type` is not practice or quiz
    body: {
      type: String,
      set(body) {
        if (!body) {
          return body;
        }
        const domWrapper = document.createElement('div');
        domWrapper.innerHTML = body;
        this.searchableBody = domWrapper.textContent;
        return body;
      },
    },
    searchableBody: {
      type: String,
    },
    durationString: { type: String, required: true },
    order: { type: Number },
  }, { collection: 'topic_unit_parts' });

  TopicUnitPartSchema.pre('validate', function (next) {
    if (['practice', 'quiz'].indexOf(this.type) === -1 && !this.body) {
      return next(new Error(`Body is required for part type ${this.type}`));
    }
    return next();
  });

  TopicUnitPartSchema.index({ unit: 1, slug: 1 }, { unique: true });
  TopicUnitPartSchema.index({ title: 'text', searchableBody: 'text' });

  return TopicUnitPartSchema;
};
