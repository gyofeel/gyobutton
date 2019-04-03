module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ["import", "html"],
  rules: {
    noConsole: "warn",
    quotes: ["error", "single"],
    noUnderscoreDangle: "warn",
    noPlusplus: ["error", {
      "allowForLoopAfterthoughts": true
    }],
    commaDangle: ["error", "never"]
  },
};