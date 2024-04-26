/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "jest-transform-stub",
  },
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};

module.exports = config;
