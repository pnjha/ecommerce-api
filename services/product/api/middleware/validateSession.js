const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

async function validateSession(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  const sessionHeaders = {
    Authorization: req.headers.Authorization
  };
  const { user_name: userName, session_id: sessionId } = options;
  const response = await fetch(`0.0.0.0:4000/v1/service/session/user/${userName}/session_id/${sessionId}`, {
    method: "GET",
    headers: sessionHeaders
  });
  if (response.status === StatusCodes.OK) {
    const userInfo = await response.json();
    res.user_info = userInfo;
  } else {
    res.status(response.status);
  }
}

module.exports = validateSession;
