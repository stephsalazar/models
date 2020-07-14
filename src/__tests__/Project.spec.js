const mongoose = require('mongoose');
const { Project } = require('../../')(mongoose);


describe('Project', () => {
  const projectJSON = {
    slug: 'cipher',
    repo: 'Laboratoria/curricula-js',
    path: 'projects/01-cipher',
    version: '1.0.0',
    parserVersion: '1.1.1',
    prefix: 1,
    title: 'Cifrado César',
    rubric: '2',
    locale: 'es-ES',
    track: 'js',
    skills: {},
  };

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Project.createIndexes();
  });

  it('should allow to save first version of new project', () => {
    const project = new Project(projectJSON);
    return project.save();
  });

  it('should fail to save when project/version already exists', () => {
    const project = new Project({ ...projectJSON, slug: 'cipher-bar' });
    const project2 = new Project({ ...projectJSON, slug: 'cipher-bar' });

    return project.save()
      .then(() => project2.save())
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should allow to save new version of existing project', () => {
    const project = new Project({ ...projectJSON, slug: 'cipher-baz' });
    const project2 = new Project({ ...projectJSON, slug: 'cipher-baz', version: '2.2.1' });

    return project.save()
      .then(() => project2.save());
  });

  it('should allow to save same version of different projects', () => {
    const project = new Project({ ...projectJSON, slug: 'cipher-qux' });
    const project2 = new Project({ ...projectJSON, slug: 'cipher-quxx' });

    return project.save()
      .then(() => project2.save());
  });

  it('should be able to query projects latest version of each project', () => {
    const project1 = new Project({ ...projectJSON, slug: 'cipher-1', version: '1.0.0' });
    const project1Version2 = new Project({ ...projectJSON, slug: 'cipher-1', version: '2.0.0' });
    const project2 = new Project({ ...projectJSON, slug: 'cipher-2', version: '1.0.0' });
    const project2Version2 = new Project({ ...projectJSON, slug: 'cipher-2', version: '2.0.0' });
    const project3 = new Project({ ...projectJSON, slug: 'cipher-3', version: '1.0.0' });

    return project1.save()
      .then(() => project1Version2.save())
      .then(() => project2.save())
      .then(() => project2Version2.save())
      .then(() => project3.save())
      .then(() => Project.findLatest())
      .then((docs) => {
        expect(docs.map((result) => {
          const { _id, createdAt, ...obj } = result.toJSON();
          return { ...obj };
        })).toMatchSnapshot();
        return Project.findLatest('cipher-1');
      })
      .then((doc) => {
        expect(`${doc._id}`).toBe(`${project1Version2._id}`);
        expect(doc.slug).toBe(project1Version2.slug);
      });
  });
});
