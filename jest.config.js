/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['***/**/*.test.(ts|ts|js)'],
  verbose: true,
  forceExit: true
};