module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard",
    "plugin:prettier/recommended"
  ],
  parser: "babel-eslint",
  settings: {
  },
  rules: {
    "no-return-assign": 0,
    "no-new": 0
  }
};
