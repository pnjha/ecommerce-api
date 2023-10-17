const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

async function validateUserLoginInput(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name) || _.isEmpty(options.password)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username and email id cannot be empty" });
  }
}
async function validateSessionInput(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username cannot be empty" });
  }
  if (_.isEmpty(req.headers.authorization)) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "session token is missing" });
  }
}
async function validateUserLogoutInput(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username cannot be empty" });
  }
}

module.exports = {
  validateUserLoginInput,
  validateSessionInput,
  validateUserLogoutInput
};
