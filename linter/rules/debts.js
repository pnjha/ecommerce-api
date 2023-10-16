// contains retroactively maintained rules, which should be strictly followed to reduce overall debt
// these should be turned on and fixed in due course [debts can be displayed using "npm show-debts"]

module.exports = {
  rules: {
    "no-await-in-loop": "off",
    "class-methods-use-this": "off"
  }
};
