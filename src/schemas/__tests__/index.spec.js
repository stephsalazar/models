const mongoose = require('mongoose/browser');
const schemas = require('../');

describe('index', () => {
  it('should use global window object when available', () => {
    global.window = {};
    schemas(mongoose);
    global.window = undefined;
  });

  it('should use default object when window is unavailable', () => {
    schemas(mongoose);
  });
});
