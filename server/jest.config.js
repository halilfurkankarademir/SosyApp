export default {
    globalSetup: "./src/__tests__/globalSetup.js",
    globalTeardown: "./src/__tests__/globalTeardown.js",
    setupFilesAfterEnv: ["./src/__tests__/setupFiles.js"],
    testEnvironment: "node",
    testTimeout: 30000,
    transform: {
        "^.+\\.m?js$": "babel-jest",
    },
    verbose: true,
    testMatch: ["**/__tests__/**/*.test.js"],
};
