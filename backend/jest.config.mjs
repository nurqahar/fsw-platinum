export default {
  moduleFileExtensions: ["mjs", "js"],
  testRegex: "test.mjs$",
  collectCoverageFrom: [
    "**/**/*.{mjs,js}",
    "!<rootDir>/database/**/*",
    "!<rootDir>/node_modules/",
    "!<rootDir>/jest.config.mjs",
    "!<rootDir>/knexfile.js",
    "!<rootDir>/coverage/**",
    "!<rootDir>/__test__/**",
  ],
};
