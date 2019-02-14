# Laboratoria/models

[![Build Status](https://travis-ci.com/Laboratoria/models.svg?branch=master)](https://travis-ci.com/Laboratoria/models)

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
const { validate } = require('models');

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
const { validate } = require('models');

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
const { Project } = require('models');
const project = new Project({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

project.validate((err) => {
  // ...
});
```

Using `mongoose` _schemas_:

```js
const { ProjectSchema } = require('models');
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

* `CampusSchema`
* `CohortSchema`
* `ProjectSchema`
* `ProjectFeedbackSchema`
* `ReviewerSurveySchema`
* `TopicSchema`
* `TopicProgressSchema` (TBD)
* `UserProfileSchema` (TBD)
