const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const User = require("../../core/user/User");

async function addUser(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const user = new User(options);
  try {
    const { user_id: userId } = await user.createUser();
    res.status(StatusCodes.CREATED).json({ user_id: userId });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function getUser(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const user = new User(options);
  try {
    const userInfo = await user.fetchUser();
    res.status(StatusCodes.OK).json(userInfo);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function updateUserRole(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const user = new User(options);
  try {
    await user.updateUserRole();
    res.status(StatusCodes.OK).json({});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}

module.exports = {
  addUser,
  getUser,
  updateUserRole
};
