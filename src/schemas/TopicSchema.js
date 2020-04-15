const {
  slug,
  locale,
  track,
  semverVersion,
} = require('./common');


module.exports = (conn) => {
  const TopicSchema = new conn.Schema({
    slug: { ...slug, unique: false },
    repo: { type: String, required: true },
    path: { type: String, required: true },
    version: semverVersion,
    parserVersion: semverVersion,
    track,
    locale,
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String },
    tags: {}, // ?? describe nested objects??? { primary: {...}, secondary: {...} }
    targetAudience: { type: String },
    dependencies: { type: String },
    learningObjectives: { type: String },
    product: { type: String },
    grades: { type: String },
    contributors: { type: String },
    books: { type: String },
    benchmarks: { type: String },
    references: { type: String },
    stats: {
      duration: { type: Number, required: true },
      durationString: { type: String, required: true },
      exerciseCount: { type: Number, required: true },
      unitCount: { type: Number, required: true },
      partCount: { type: Number, required: true },
    },
    price: { type: Number, default: 0 },
  });

  TopicSchema.index({ slug: 1, version: 1 }, { unique: true });

  // Wildcard text index to match any string field in a user document
  // NOTE: do we need to index al ALL text fields??
  // TopicSchema.index({ '$**': 'text' });

  return TopicSchema;
};
