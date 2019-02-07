// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Project = require('../src/models/Project');


describe('e2e::projects', () => {
  // let connection;
  // let db;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
    // connection = await MongoClient.connect(global.__MONGO_URI__);
    // db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    // await connection.close();
    // await db.close();
    await mongoose.disconnect();
  });

  it('should ...', () => {
    const project = new Project({
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.2.0',
      parserVersion: '1.1.1',
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      track: 'js',
      skills: {},
    });

    return project.save()
      .then((result) => {
        console.log('result', result);
        return Project.find().exec();
      })
      .then((docs) => {
        console.log(docs);
      });

    // ProjectModel.find().exec()
    //   .then((docs) => {
    //     console.log(docs);
    //     done();
    //   })
    //   .catch(done);

    // const project = new ProjectModel();
    // console.log(project);
    // project.validate((err) => {
    //   console.log(err);
    //   done();
    // });
    // const campuses = db.collection('campuses');
    //
    // campuses.insertMany([
    //   { code: 'LIM' },
    //   { code: 'SCL' },
    //   { code: 'CDMX' },
    //   { code: 'GDL' },
    //   { code: 'SPL' },
    // ])
    //   .then((/* result */) => {
    //     // console.log(result);
    //     done();
    //   })
    //   .catch(done);

    // console.log(connection);
  });
});
