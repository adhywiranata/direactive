module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: "./coverage/",
  preset: "ts-jest",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}