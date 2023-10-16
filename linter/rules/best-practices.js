module.exports = {
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "no-eq-null": "error",
    "no-extra-parens": [
      "off",
      "all",
      {
        nestedBinaryExpressions: false
      }
    ],
    "no-restricted-syntax": "off",
    "no-shadow": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-unused-vars": [
      "error",
      {
        args: "none"
      }
    ],
    quotes: [
      "error",
      "single",
      {
        avoidEscape: true
      }
    ],
    "spaced-comment": ["error", "always"],
    strict: ["error", "global"],
    "import/no-unresolved": ["error", { commonjs: true, amd: true }],
    "import/named": "error",
    "import/namespace": "error",
    "import/no-extraneous-dependencies": "error",
    yoda: ["error", "never", { exceptRange: true }],
    "no-template-curly-in-string": "warn"
  }
};
