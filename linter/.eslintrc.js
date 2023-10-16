const _ = require("lodash");
const path = require("path");

const ignoreDebts = process.env.IGNORE_DEBTS;
const eslintConfigFile = require.resolve(__filename);
const linterDir = path.dirname(eslintConfigFile);
const rulesFileList = ["best-practices.js", "style.js"];
if (_.isEmpty(ignoreDebts)) {
  rulesFileList.push("debts.js");
}
const internalRules = rulesFileList.map((rule) => path.join(linterDir, "rules", rule)).map(require.resolve);
const prettierEndRule = ["prettier"];

module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  parser: "espree",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: ["airbnb-base", ...internalRules, ...prettierEndRule],
  plugins: ["import", "jest"]
};
