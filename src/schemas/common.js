const semver = require('semver');


exports.slug = {
  type: String,
  lowercase: true,
  trim: true,
  minlength: 3,
  maxlength: 100,
  required: true,
  index: true,
  unique: true,
};


exports.locale = {
  type: String,
  required: true,
  enum: ['es-ES', 'es-PE', 'es-CL', 'es-MX', 'pt-BR', 'en-US'],
};


exports.program = {
  type: String,
  required: true,
  enum: [
    'pre', // Admission
    'bc', // Bootcamp
    'jp', // Job Placement
    'l4b', // Laboratoria for Business (aka corporate training)
    'ec', // Educación Continua (deprecated!!!)
  ],
};


exports.track = {
  type: String,
  required: true,
  enum: [
    'core', // Common Core (Bootcamp)
    'js', // JavaScript Track (Bootcamp)
    'ux', // UX Track (Bootcamp)
    'mobile', // Mobile Track (Bootcamp) - NOT IN USE
    'business', // Corporate Training
  ],
};


exports.semverVersion = {
  type: String,
  required: true,
  validate: (val) => {
    const sanitized = semver.clean(val);
    if (!semver.valid(sanitized)) {
      throw new Error(`Invalid semver version ${val}`);
    }
    return sanitized;
  },
};
