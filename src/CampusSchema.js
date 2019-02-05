const { Schema } = require('mongoose');


module.exports = new Schema({
  slug: { type: String, required: true },
  city: { type: String, required: true },
  // address ???
  country: { type: String, required: true },
  title:  { type: String, required: true },
  locale: { type: String, required: true },
  timezone: { type: String, required: true },
});
