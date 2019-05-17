const mongoose = require('mongoose');
const { Topic, TopicUnit, TopicUnitPart } = require('../')(mongoose);
const babelJson = require('./fixtures/topics/babel.json');


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

  it('should save babel topic and then get with Topic.findLatest(slug)', () => {
    const topic = new Topic(babelJson);
    return topic.save()
      .then((result) => {
        expect(result.slug).toBe('babel');
        return Topic.findLatest('babel');
      })
      .then(doc => expect(doc.slug).toBe('babel'));
  });

  it('should save babel topic and then get with Topic.findLatest()', () => {
    const topic = new Topic(babelJson);
    return topic.save()
      .then((result) => {
        expect(result.slug).toBe('babel');
        return Topic.findLatest();
      })
      .then(docs => expect(docs[0].slug).toBe('babel'));
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

    const unitsBefore = await TopicUnit.find({ topic: topic._id });
    expect(unitsBefore.length).toBe(2);
    const partsBefore = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id })),
    );
    expect(partsBefore.length).toBe(2);
    expect(partsBefore[0].length).toBe(3);
    expect(partsBefore[1].length).toBe(1);

    await Topic.remove({ _id: saveResult._id });
    const unitsAfter = await TopicUnit.find({ topic: topic._id });
    expect(unitsAfter.length).toBe(0);
    const partsAfter = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id })),
    );
    expect(partsAfter[0].length).toBe(0);
    expect(partsAfter[1].length).toBe(0);
    return Promise.resolve();
  });

  it('should delete units and parts when topic is deleted (as doc)', async () => {
    const topic = new Topic(babelJson);
    const saveResult = await topic.save();
    expect(saveResult.slug).toBe('babel');

    const unitsBefore = await TopicUnit.find({ topic: topic._id });
    expect(unitsBefore.length).toBe(2);
    const partsBefore = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id })),
    );
    expect(partsBefore.length).toBe(2);
    expect(partsBefore[0].length).toBe(3);
    expect(partsBefore[1].length).toBe(1);

    await topic.remove();
    const unitsAfter = await TopicUnit.find({ topic: topic._id });
    expect(unitsAfter.length).toBe(0);
    const partsAfter = await Promise.all(
      unitsBefore.map(unit => TopicUnitPart.find({ unit: unit._id })),
    );
    expect(partsAfter[0].length).toBe(0);
    expect(partsAfter[1].length).toBe(0);
    return Promise.resolve();
  });

  it('should populate units and parts', async () => {
    const topic = new Topic(babelJson);
    await topic.save();

    const results = await Topic.find().populate({
      path: 'syllabus',
      populate: {
        path: 'parts',
      },
    });

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

    const updatedTopic = await Topic.findOne({ slug: 'babel' })
      .populate({
        path: 'syllabus',
        populate: { path: 'parts' },
        // sort???
      });

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
      .populate({
        path: 'syllabus',
        populate: { path: 'parts' },
        // sort???
      });

    expect(updatedTopics.length).toBe(2);
    expect(updatedTopics[0].version).toBe(babelJson.version);
    expect(updatedTopics[1].version).toBe('9.9.9');

    updatedTopics.forEach((updatedTopic) => {
      expect(updatedTopic.slug).toBe('babel');
      expect(updatedTopic.syllabus.length).toBe(3);
      // FIXME: Para poder hacer estas aserciones necesitamos garantizar orden!
      // Cómo hacemos sort de los resultados de `populate`??
      // expect(updatedTopic.syllabus[2].slug).toBe('09-foo');
      // expect(updatedTopic.syllabus[2].parts.length).toBe(1);
      // expect(updatedTopic.syllabus[2].parts[0].slug).toBe('00-intro');
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

    const updatedTopic = await Topic.findOne({ _id: topic._id }).populate({
      path: 'syllabus',
      populate: { path: 'parts' },
    });

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

    const updatedTopic = await Topic.findOne({ _id: topic._id }).populate({
      path: 'syllabus',
      populate: { path: 'parts' },
    });

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
      populate: { path: 'parts' },
    });

    expect(updatedTopic.title).toBe('BabelJS');
    expect(updatedTopic.slug).toBe('babel');

    // NOTE: `findOneAndUpdate` resuelve al documento actualizado cuando usamos
    // { new: true }, pero los subdocumentos que llena populate no. Así que
    // hacemos otra query para verificar que se actualizaton los subdocumentos.
    const updatedTopic2 = await Topic.findOne({ slug: babelJson.slug, version: babelJson.version })
      .populate({
        path: 'syllabus',
        populate: { path: 'parts' },
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
});
