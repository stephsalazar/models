const mongoose = require('mongoose');
const {
  User,
  UserActivityFeedEvents: {
    UserActivityFeedEvent,
    AcademicProfileCommentEvent,
    ReviewAnswerEvent,
  },
} = require('../')(mongoose);

describe('UserActivityFeedEvent', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should fail with missing props', () => {
    const event = new UserActivityFeedEvent();
    return event.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const event = new UserActivityFeedEvent({
      user: mongoose.Types.ObjectId(),
      doc: mongoose.Types.ObjectId(),
    });

    return event.save()
      .then((result) => {
        expect(typeof result.createdAt).toBe('object');
        expect(result.type).toBe('UserActivityFeedEvent');
      });
  });
});

describe('AcademicProfileCommentEvent', () => {
  let user;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await User.createIndexes();
    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    await user.save();
  });

  it('should fail with missing props', () => {
    const event = new AcademicProfileCommentEvent();
    return event.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const event = new AcademicProfileCommentEvent({
      user: user._id,
      doc: mongoose.Types.ObjectId(),
      createdBy: user._id,
      commentType: 'tech',
      project: 'Cifrado Cesar',
      text: 'A test',
    });

    return event.save()
      .then((result) => {
        expect(typeof result.createdAt).toBe('object');
        expect(result.type).toBe('AcademicProfileCommentEvent');
      });
  });

  it('should fail when createdBy does not exist', async () => {
    const event = new AcademicProfileCommentEvent({
      user: (new User())._id,
      doc: mongoose.Types.ObjectId(),
      createdBy: (new User())._id,
      commentType: 'tech',
      project: 'Cifrado Cesar',
      text: 'A test',
    });

    return event.save()
      .catch((err) => {
        expect(err.message).toBe('CreatedBy does not exist');
      });
  });
});

describe('ReviewAnswerEvent', () => {
  let user;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await User.createIndexes();
    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    await user.save();
  });

  it('should fail with missing props', () => {
    const event = new ReviewAnswerEvent();
    return event.save()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should save successfully with appropriate fields', () => {
    const event = new ReviewAnswerEvent({
      user: user._id,
      doc: mongoose.Types.ObjectId(),
      createdBy: user._id,
      commentType: 'tech',
      project: 'Cifrado Cesar',
      text: 'A test',
    });

    return event.save()
      .then((result) => {
        expect(typeof result.createdAt).toBe('object');
        expect(result.type).toBe('ReviewAnswerEvent');
      });
  });

  it('should fail when createdBy does not exist', async () => {
    const event = new ReviewAnswerEvent({
      user: (new User())._id,
      doc: mongoose.Types.ObjectId(),
      createdBy: (new User())._id,
      commentType: 'tech',
      project: 'Cifrado Cesar',
      text: 'A test',
    });

    return event.save()
      .catch((err) => {
        expect(err.message).toBe('CreatedBy does not exist');
      });
  });
});
