# Laboratoria/models

[![Build Status](https://travis-ci.com/Laboratoria/models.svg?branch=master)](https://travis-ci.com/Laboratoria/models)

## Installation

```sh
npm i Laboratoria/models
```

In your `package.json`:

```json
{
  "dependencies": {
    "models": "Laboratoria/models#v1.3.9"
  }
}
```

## Usage

Validación sin saber nada de `mongoose` (internals).

```js
const { validate } = require('models');

validate('Project', {
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});
```

Uso de _schemas_ de `mongoose`:

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

Uso de _modelos_ de `mongoose`:

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

## Testing

```
npm test
```

***

## Models

* [`Campus`](./src/models/Campus.js)
* [`Cohort`](./src/models/Cohort.js)
* [`Project`](./src/models/Project.js)
* [`ProjectFeedback`](./src/models/ProjectFeedback.js)
* [`ProjectReviewerSurvey`](./src/models/ProjectReviewerSurvey.js)
* [`Topic`](./src/models/Topic.js)
* `TopicUnit` (TBD)
* `TopicUnitPart` (TBD)
* `TopicProgress` (TBD)
* `UserProfile` (TBD)

## Schemas

* `CampusSchema`
* `CohortSchema`
* `ProjectSchema`
* `ProjectFeedbackSchema`
* `ProjectReviewerSurveySchema`
* `TopicSchema`
* `TopicUnitSchema` (TBD)
* `TopicUnitPartSchema` (TBD)
* `TopicProgressSchema` (TBD)
* `UserProfileSchema` (TBD)
