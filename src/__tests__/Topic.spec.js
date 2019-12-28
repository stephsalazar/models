const mongoose = require('mongoose');
const { Topic, TopicUnit, TopicUnitPart } = require('../../')(mongoose);
const babelJson = require('./fixtures/topics/babel.json');


const createTestTopics = async () => {
  await Promise.all([
    babelJson,
    { ...babelJson, version: '2.2.0' },
    { ...babelJson, version: '2.3.0-test' },
    { ...babelJson, version: '2.3.0-alpha.1' },
    { ...babelJson, version: '2.3.0-lim-2018-05-bc-core-foo' },
  ].map(async (doc) => {
    const topic = new Topic(doc);
    const saveResult = await topic.save();
    expect(saveResult.slug).toBe('babel');
  }));
};


describe('Topic', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Topic.createIndexes();
  });

  it('should save babel topic and then get with Topic.findLatest(slug)', async () => {
    await createTestTopics();
    const latest = await Topic.findLatest('babel');
    expect(latest.slug).toBe('babel');
    expect(latest.version).toBe('2.3.0-test');
  });

  it('should save babel topic and then get with Topic.findLatest()', async () => {
    await createTestTopics();
    const latestTopics = await Topic.findLatest();
    expect(latestTopics.length).toBe(1);
    expect(latestTopics[0].slug).toBe('babel');
    expect(latestTopics[0].version).toBe('2.3.0-test');
  });

  it('should save babel topic and then get with Topic.findStable()', async () => {
    await createTestTopics();
    const stableTopics = await Topic.findStable();

    expect(stableTopics.length).toBe(1);
    expect(stableTopics[0].slug).toBe('babel');
    expect(stableTopics[0].version).toBe('2.2.0');
  });

  it('should save babel topic and then get with Topic.findStable(slug)', async () => {
    await createTestTopics();
    const stableTopic = await Topic.findStable('babel');

    expect(stableTopic.slug).toBe('babel');
    expect(stableTopic.version).toBe('2.2.0');
  });

  it('should save units and parts when topic is saved', () => {
    const topic = new Topic(babelJson);
    return topic.save()
      .then((result) => {
        expect(result.slug).toBe('babel');
        return TopicUnit.find({ topic: result._id }).sort({ order: 1, slug: 1 });
      })
      .then((units) => {
        expect(units.length).toBe(2);
        expect(units[0].slug).toBe('01-intro');
        expect(units[1].slug).toBe('02-foo');
        return Promise.all(
          units.map(
            unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 }),
          ),
        );
      })
      .then((parts) => {
        expect(parts[0].length).toBe(3);
        expect(parts[1].length).toBe(1);
        expect(parts[0][0].slug).toBe('01-what-is-babel');
        expect(parts[0][1].slug).toBe('02-usage');
        expect(parts[0][2].slug).toBe('03-configuration');
        expect(parts[1][0].slug).toBe('01-what-is-foo');
      });
  });

  it('should save units and parts when topic is created', () => (
    Topic.create(babelJson)
      .then((result) => {
        expect(result.slug).toBe('babel');
        return TopicUnit.find({ topic: result._id }).sort({ order: 1, slug: 1 });
      })
      .then((units) => {
        expect(units.length).toBe(2);
        expect(units[0].slug).toBe('01-intro');
        expect(units[1].slug).toBe('02-foo');
        return Promise.all(
          units.map(
            unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 }),
          ),
        );
      })
      .then((parts) => {
        expect(parts[0].length).toBe(3);
        expect(parts[1].length).toBe(1);
        expect(parts[0][0].slug).toBe('01-what-is-babel');
        expect(parts[0][1].slug).toBe('02-usage');
        expect(parts[0][2].slug).toBe('03-configuration');
        expect(parts[1][0].slug).toBe('01-what-is-foo');
      })
  ));

  it('should delete units and parts when topic is deleted (as query)', async () => {
    const topic = new Topic(babelJson);
    const saveResult = await topic.save();
    expect(saveResult.slug).toBe('babel');

    const unitsBefore = await TopicUnit.find({ topic: topic._id }).sort({ order: 1, slug: 1 });
    expect(unitsBefore.length).toBe(2);
    const partsBefore = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 })),
    );
    expect(partsBefore.length).toBe(2);
    expect(partsBefore[0].length).toBe(3);
    expect(partsBefore[1].length).toBe(1);

    await Topic.remove({ _id: saveResult._id });
    const unitsAfter = await TopicUnit.find({ topic: topic._id }).sort({ order: 1, slug: 1 });
    expect(unitsAfter.length).toBe(0);
    const partsAfter = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 })),
    );
    expect(partsAfter[0].length).toBe(0);
    expect(partsAfter[1].length).toBe(0);
    return Promise.resolve();
  });

  it('should delete units and parts when topic is deleted (as doc)', async () => {
    const topic = new Topic(babelJson);
    const saveResult = await topic.save();
    expect(saveResult.slug).toBe('babel');

    const unitsBefore = await TopicUnit.find({ topic: topic._id }).sort({ order: 1, slug: 1 });
    expect(unitsBefore.length).toBe(2);
    const partsBefore = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 })),
    );
    expect(partsBefore.length).toBe(2);
    expect(partsBefore[0].length).toBe(3);
    expect(partsBefore[1].length).toBe(1);

    await topic.remove();
    const unitsAfter = await TopicUnit.find({ topic: topic._id }).sort({ order: 1, slug: 1 });
    expect(unitsAfter.length).toBe(0);
    const partsAfter = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id }).sort({ order: 1, slug: 1 })),
    );
    expect(partsAfter[0].length).toBe(0);
    expect(partsAfter[1].length).toBe(0);
    return Promise.resolve();
  });

  it('should populate units and parts', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    const results = await Topic.findPopulated();

    expect(results.length).toBe(1);
    expect(results[0].syllabus.length).toBe(2);
    expect(results[0].syllabus[0].parts.length).toBe(3);
    expect(results[0].syllabus[1].parts.length).toBe(1);
  });

  it('updates using Topic.updateOne', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    await Topic.updateOne({ slug: 'babel' }, {
      title: 'BabelJS',
      syllabus: {
        ...babelJson.syllabus,
        '09-foo': {
          title: 'goo',
          order: 2,
          stats: {
            partCount: 1,
            exerciseCount: 0,
            duration: 10,
            durationString: '10min',
          },
          parts: {
            '00-intro': {
              title: 'Introducción',
              type: 'read',
              format: 'self-paced',
              duration: 10,
              durationString: '10min',
              body: 'Hola!',
            },
          },
        },
      },
    });

    const updatedTopic = await Topic.findOnePopulated({ slug: 'babel' });

    expect(updatedTopic.title).toBe('BabelJS');
    expect(updatedTopic.syllabus.length).toBe(3);
    expect(updatedTopic.syllabus[2].slug).toBe('09-foo');
    expect(updatedTopic.syllabus[2].parts.length).toBe(1);
    expect(updatedTopic.syllabus[2].parts[0].slug).toBe('00-intro');
  });

  it('updates more than one using Topic.update', async () => {
    const topic1 = new Topic(babelJson);
    await topic1.save();
    const topic2 = new Topic({ ...babelJson, version: '9.9.9' });
    await topic2.save();

    await Topic.update({ slug: 'babel' }, {
      title: 'BabelJS',
      syllabus: {
        ...babelJson.syllabus,
        '09-foo': {
          title: 'goo',
          order: 2,
          stats: {
            partCount: 1,
            exerciseCount: 0,
            duration: 10,
            durationString: '10min',
          },
          parts: {
            '00-intro': {
              title: 'Introducción',
              type: 'read',
              format: 'self-paced',
              duration: 10,
              durationString: '10min',
              body: 'Hola!',
            },
          },
        },
      },
    });

    const updatedTopics = await Topic.findPopulated({ slug: 'babel' });

    expect(updatedTopics.length).toBe(2);
    expect(updatedTopics[0].version).toBe(babelJson.version);
    expect(updatedTopics[1].version).toBe('9.9.9');

    updatedTopics.forEach((updatedTopic) => {
      expect(updatedTopic.slug).toBe('babel');
      expect(updatedTopic.syllabus.length).toBe(3);
      expect(updatedTopic.syllabus[2].slug).toBe('09-foo');
      expect(updatedTopic.syllabus[2].parts.length).toBe(1);
      expect(updatedTopic.syllabus[2].parts[0].slug).toBe('00-intro');
    });
  });

  it('updates ONLY FIRST MATCH when using Query.update', async () => {
    const topic1 = new Topic(babelJson);
    await topic1.save();
    const topic2 = new Topic({ ...babelJson, version: '9.9.9' });
    await topic2.save();

    await Topic.find({ slug: 'babel' }).update({
      title: 'BabelJS',
      syllabus: {
        ...babelJson.syllabus,
        '09-foo': {
          title: 'goo',
          stats: {
            partCount: 1,
            exerciseCount: 0,
            duration: 10,
            durationString: '10min',
          },
          parts: {
            '00-intro': {
              title: 'Introducción',
              type: 'read',
              format: 'self-paced',
              duration: 10,
              durationString: '10min',
              body: 'Hola!',
            },
          },
        },
      },
    });

    const updatedTopics = await Topic.find({ slug: 'babel' })
      .sort({ version: 1 });

    expect(updatedTopics.length).toBe(2);
    expect(updatedTopics[0].version).toBe(babelJson.version);
    expect(updatedTopics[1].version).toBe('9.9.9');

    expect(updatedTopics[0].title).toBe('BabelJS');
    expect(updatedTopics[1].title).toBe('Babel');
  });

  it('updates one using model.update()', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    const updateResult = await topic.update({
      title: 'BabelJS',
      syllabus: {
        ...babelJson.syllabus,
        '09-foo': {
          title: 'goo',
          order: 2,
          stats: {
            partCount: 1,
            exerciseCount: 0,
            duration: 10,
            durationString: '10min',
          },
          parts: {
            '00-intro': {
              title: 'Introducción',
              type: 'read',
              format: 'self-paced',
              duration: 10,
              durationString: '10min',
              body: 'Hola!',
            },
          },
        },
      },
    });

    expect(updateResult).toEqual({ n: 1, nModified: 1, ok: 1 });

    const updatedTopic = await Topic.findOnePopulated({ _id: topic._id });

    expect(updatedTopic.slug).toBe('babel');
    expect(updatedTopic.syllabus.length).toBe(3);
    expect(updatedTopic.syllabus[2].slug).toBe('09-foo');
    expect(updatedTopic.syllabus[2].parts.length).toBe(1);
    expect(updatedTopic.syllabus[2].parts[0].slug).toBe('00-intro');
  });

  it('updates one using assignment + model.save()', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    topic.title = 'BabelJS';
    topic.syllabus = {
      ...babelJson.syllabus,
      '09-foo': {
        title: 'goo',
        order: 2,
        stats: {
          partCount: 1,
          exerciseCount: 0,
          duration: 10,
          durationString: '10min',
        },
        parts: {
          '00-intro': {
            title: 'Introducción',
            type: 'read',
            format: 'self-paced',
            duration: 10,
            durationString: '10min',
            body: 'Hola!',
          },
        },
      },
    };

    const updateResult = await topic.save();

    expect(updateResult.title).toBe('BabelJS');

    const updatedTopic = await Topic.findOnePopulated({ _id: topic._id });

    expect(updatedTopic.slug).toBe('babel');
    expect(updatedTopic.syllabus.length).toBe(3);
    expect(updatedTopic.syllabus[2].slug).toBe('09-foo');
    expect(updatedTopic.syllabus[2].parts.length).toBe(1);
    expect(updatedTopic.syllabus[2].parts[0].slug).toBe('00-intro');
  });

  it('updates one using findOneAndUpdate', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    const updatedTopic = await Topic.findOneAndUpdate(
      { slug: babelJson.slug, version: babelJson.version },
      {
        title: 'BabelJS',
        syllabus: {
          ...babelJson.syllabus,
          '09-foo': {
            title: 'goo',
            order: 2,
            stats: {
              partCount: 1,
              exerciseCount: 0,
              duration: 10,
              durationString: '10min',
            },
            parts: {
              '00-intro': {
                title: 'Introducción',
                type: 'read',
                format: 'self-paced',
                duration: 10,
                durationString: '10min',
                body: 'Hola!',
              },
            },
          },
        },
      },
      { new: true },
    ).populate({
      path: 'syllabus',
      options: { sort: { order: 1, slug: 1 } },
      populate: {
        path: 'parts',
        options: { sort: { order: 1, slug: 1 } },
      },
    });

    expect(updatedTopic.title).toBe('BabelJS');
    expect(updatedTopic.slug).toBe('babel');

    // NOTE: `findOneAndUpdate` resuelve al documento actualizado cuando usamos
    // { new: true }, pero los subdocumentos que llena populate no. Así que
    // hacemos otra query para verificar que se actualizaton los subdocumentos.
    const updatedTopic2 = await Topic.findOnePopulated({
      slug: babelJson.slug,
      version: babelJson.version,
    });

    expect(updatedTopic2.syllabus.length).toBe(3);
    expect(updatedTopic2.syllabus[2].slug).toBe('09-foo');
    expect(updatedTopic2.syllabus[2].parts.length).toBe(1);
    expect(updatedTopic2.syllabus[2].parts[0].slug).toBe('00-intro');
  });

  it('updates MANY when using Query.updateMany', async () => {
    const topic1 = new Topic(babelJson);
    await topic1.save();
    const topic2 = new Topic({ ...babelJson, version: '9.9.9' });
    await topic2.save();

    await Topic.updateMany({ slug: 'babel' }, {
      title: 'BabelJS',
    });

    const updatedTopics = await Topic.find({ slug: 'babel' });

    expect(updatedTopics.length).toBe(2);
    expect(updatedTopics[0].version).toBe(babelJson.version);
    expect(updatedTopics[1].version).toBe('9.9.9');

    expect(updatedTopics[0].title).toBe('BabelJS');
    expect(updatedTopics[1].title).toBe('BabelJS');
  });

  it('validates units (syllabus)', () => {
    const topic = new Topic({
      ...babelJson,
      syllabus: {
        ...babelJson.syllabus,
        foo: {},
      },
    });
    return topic.validate()
      .catch((err) => {
        expect(err.name).toBe('ValidationError');
        expect(err.errors).toMatchSnapshot();
      });
  });

  it('validates parts', () => {
    const json = { ...babelJson };
    json.syllabus['01-intro'].parts['01-what-is-babel'].format = 'OMG';
    const topic = new Topic(json);
    return topic.validate()
      .catch((err) => {
        expect(err.name).toBe('ValidationError');
        expect(err.errors).toMatchSnapshot();
      });
  });
});
