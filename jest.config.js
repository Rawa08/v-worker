export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
};