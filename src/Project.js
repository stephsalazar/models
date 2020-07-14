const semver = require('semver');

module.exports = (conn, ProjectSchema) => {
  const Project = conn.model('Project', ProjectSchema);

  const find = function (slug, stable = true) {
    // eslint-disable-next-line no-shadow
    const getBySlug = slug => this.find({ slug }, 'version')
      .then(versions => versions
        .map(({ version }) => version)
        .filter(version => !stable || version.indexOf('-') === -1)
        .sort((a, b) => {
          if (semver.lt(a, b)) {
            return 1;
          }
          if (semver.gt(a, b)) {
            return -1;
          }
          return 0;
        }))
      .then(sortedVersions => sortedVersions[0])
      .then(version => this.findOne({ slug, version }));

    return (slug)
      ? getBySlug(slug)
      : this.distinct('slug')
        .then(slugs => Promise.all(slugs.map(getBySlug)))
        .then(projects => projects.filter(project => project));
  };

  Project.findLatest = function (slug) {
    return find.call(this, slug, false);
  };

  return Project;
};
