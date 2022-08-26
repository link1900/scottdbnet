module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["src", "node_modules"],
  verbose: true,
  globalSetup: "./src/test/testSetup.ts",
  setupFilesAfterEnv: ["./src/test/testSetupPostEnv.ts"],
  globalTeardown: "./src/test/testTeardown.ts",
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/test/*.ts",
    "!src/index.ts",
    "!dist/**",
    "!dist/package.json",
    "!build/**",
    "!build/package.json"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "text-summary", "lcov", "html"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30
    }
  }
};
