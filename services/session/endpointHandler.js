const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const Session = require("../../core/session/Session");

async function createSession(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const session = new Session(options);
  try {
    const { sessionId, sessionToken } = await session.createSession();
    res.status(StatusCodes.OK).json({ session_id: sessionId, session_token: sessionToken });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function validateSession(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const session = new Session(options);
  try {
    const userInfo = await session.validateSession();
    res.status(StatusCodes.OK).json(userInfo);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function destroySession(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const session = new Session(options);
  try {
    await session.destroySession();
    res.status(StatusCodes.OK).json({});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function destroyAllSession(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const session = new Session(options);
  try {
    await session.destroyAllSession();
    res.status(StatusCodes.OK).json({});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
module.exports = {
  createSession,
  validateSession,
  destroySession,
  destroyAllSession
};
