module.exports = {
  name: 'models',
  displayName: 'Models',
  testMatch: ['<rootDir>/src/__tests__/**/*.spec.js'],
  testEnvironment: '<rootDir>/src/__tests__/config/mongo-environment.js',
  globalSetup: '<rootDir>/src/__tests__/config/setup.js',
  globalTeardown: '<rootDir>/src/__tests__/config/teardown.js',
  coverageDirectory: '<rootDir>/coverage/models',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/schemas',
    '<rootDir>/src/__tests__',
  ],
};
