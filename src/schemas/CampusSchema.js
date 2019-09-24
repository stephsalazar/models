const { slug, locale } = require('./common');


module.exports = (conn) => {
  const CampusSchema = new conn.Schema({
    slug: { ...slug, maxlength: 4 },
    name: { type: String, required: true },
    locale,
    timezone: { type: String, required: true },
    active: { type: Boolean, require: true, default: true },
    // Deberíamos llevar la cuenta del número de generaciones de cada campus acá?
    // generations: { type: Number, required: true, default: 0 }, // ????
  }, { collection: 'campuses' });

  return CampusSchema;
};
