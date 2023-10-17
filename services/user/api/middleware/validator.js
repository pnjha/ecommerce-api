const _ = require("lodash");
const { roles } = require("../../../../core/user/properties");
const { StatusCodes } = require("http-status-codes");

async function validateNewUser(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name) || _.isEmpty(options.email_id) || _.isEmpty(password)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username, password and email id cannot be empty" });
  }
}
async function validateFetchUser(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username cannot be empty" });
  }
}
async function validateRoleUpdate(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_name)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "username cannot be empty" });
  }
  const filteredRoles = _.filter(options.role, (role) => _.includes(Object.values(role), role));
  if (filteredRoles.length !== options.role.length) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: `only ${Object.values(role)} are supported` });
  }
}

module.exports = {
  validateNewUser,
  validateFetchUser,
  validateRoleUpdate
};
