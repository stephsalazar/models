module.exports = {
  name: 'schemas',
  displayName: 'Schemas',
  testMatch: ['<rootDir>/src/schemas/**/*.spec.js'],
  coverageDirectory: '<rootDir>/coverage/schemas',
  collectCoverageFrom: [
    '<rootDir>/src/schemas/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/schemas/__tests__',
  ],
};
