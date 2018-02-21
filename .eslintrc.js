module.exports = {
    extends: "plugin:vue/strongly-recommended",
    parser: "vue-eslint-parser",
    parserOptions: {
      sourceType: "module",
      parser: 'babel-eslint'
    },
    plugins: [
      "promise",
      "async-await"
    ],
    rules: {
      "async-await/space-after-async": 2,
      "async-await/space-after-await": 2
    }
  }