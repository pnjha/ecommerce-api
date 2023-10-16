module.exports = {
  rules: {
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "comma-dangle": "off",
    "func-names": ["warn", "as-needed"],
    camelcase: ["off", { properties: "never" }],
    "lines-between-class-members": ["error", "never"],
    "no-constant-condition": ["warn", { checkLoops: false }]
  }
};
