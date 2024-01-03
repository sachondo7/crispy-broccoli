module.exports = {
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: './coverage'
};
