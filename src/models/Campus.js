const mongoose = require('mongoose');


const CampusSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  locale: { type: String, required: true },
  timezone: { type: String, required: true },
  active: { type: Boolean, require: true, default: true },
  // Deberíamos llevar la cuenta del número de generaciones de cada campus acá?
  // generations: { type: Number, required: true, default: 0 }, // ????
});


const Campus = mongoose.model('Campus', CampusSchema);


module.exports = Campus;
module.exports.Campus = Campus;
module.exports.CampusSchema = CampusSchema;
