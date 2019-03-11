module.exports = (conn, TopicSchema) => {
  const Topic = conn.model('Topic', TopicSchema);

  Topic.findLatest = function (slug) {
    return (slug)
      ? this.findOne({ slug })
        .sort({ version: -1 })
        .limit(1)
      : this.aggregate([
        { $sort: { slug: 1, version: -1 } },
        {
          $group: {
            _id: '$slug',
            id: { $first: '$_id' },
            slug: { $first: '$slug' },
            name: { $first: '$title' },
            latestVersion: { $first: '$version' },
            versions: { $push: '$version' },
          },
        },
        { $sort: { _id: 1 } },
      ])
        .then(docs => docs.map(({ id, ...doc }) => ({ ...doc, _id: id })));
  };

  return Topic;
};
