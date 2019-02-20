# Laboratoria/models

[![Build Status](https://travis-ci.com/Laboratoria/models.svg?branch=master)](https://travis-ci.com/Laboratoria/models)

This module is meant to be used with Node.js and expects the Node.js version of
the [`mongoose`](https://mongoosejs.com/) module as an argument. If you are
looking for _schemas_ to be used in the front-end please check
[`Laboratoria/schemas`](https://github.com/Laboratoria/schemas).

## Installation

```sh
npm install --save Laboratoria/models
```

Or add it in your `package.json` and then `npm install`:

```json
{
  "dependencies": {
    "models": "Laboratoria/models#v1.0.0-alpha.1"
  }
}
```

## Usage

Validation without knowing anything about `mongoose` (internals).

```js
const mongoose = require('mongoose');
const { validate } = require('models')(mongoose);

validate('Project', {
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
}, (err) => {
  if (err) {
    // validation failed ...
  }

  // ...
});
```

Using `validate` as a `Promise`:

```js
const mongoose = require('mongoose');
const { validate } = require('models')(mongoose);

validate('Project', {
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
})
  .then(() => {
    // Validation succeeded ;-)
  })
  .catch((err) => {
    // Validation failed :-(
  });
```

Using `mongoose` _models_:

```js
const mongoose = require('mongoose');
const { Project } = require('models')(mongoose);

// Creating a new instance of a Model
const project = new Project({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

// Validating model instance
project.validate((err) => {
  // ...
});

// Saving model...
project.save()
  .then(console.log)
  .catch(console.error);

// Querying for all documents in collection
Project.find({}, (err, docs) => {
  if (err) {
    console.error(err);
  }
  // doc something with `docs`...
});
```

Using `mongoose` _schemas_:

```js
const mongoose = require('mongoose');
const { ProjectSchema } = require('models')(mongoose);
const ProjectModel = mongoose.model('Project', ProjectSchema);
const project = new ProjectModel({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

project.validate((err) => {
  // ...
});
```

## Testing

Unit tests (and linter):

```sh
yarn test
```

End-to-end tests:

```sh
yarn e2e
```

***

## Models

* [`Campus`](./src/models/Campus.js)
* [`Cohort`](./src/models/Cohort.js)
* [`Project`](./src/models/Project.js)
* [`ProjectFeedback`](./src/models/ProjectFeedback.js)
* [`ReviewerSurvey`](./src/models/ReviewerSurvey.js)
* [`Topic`](./src/models/Topic.js)
* `TopicProgress` (TBD)
* `UserProfile` (TBD)

## Schemas

See [`Laboratoria/schemas`](https://github.com/Laboratoria/schemas).
