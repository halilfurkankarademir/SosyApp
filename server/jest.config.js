export default {
    transform: {},
    testEnvironment: "node",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/test-setup.js"],
    testTimeout: 30000,
};
