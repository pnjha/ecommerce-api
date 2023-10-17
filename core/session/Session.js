const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const DatabaseActions = require("./db");
const JWT = require("../../core/jwt");

class Session {
  constructor(opts) {
    this.dbClient = options.dbClient;
    this.dbActionsProcessor = new DatabaseActions(options.dbClient);
    this.options = opts;
    this.userName = opts.user_name;
  }
  async createSession() {
    const response = await fetch(`0.0.0.0:3000/v1/service/user/${this.userName}`);
    if (response.status === StatusCodes.OK) {
      const userInfo = response.json();
      if (userInfo.password_plaintext !== this.options.password) {
        throw new Error("invalid username or password");
      }
      const sessionId = uuidv4();
      const sessionToken = await JWT.createToken(this.options, sessionId);
      await this.dbActionsProcessor.createSession(this.userName, sessionId);
      return { sessionId, sessionToken };
    } else {
      if (userInfo.username !== this.userName) {
        throw new Error("invalid username or password");
      }
    }
  }
  async validateSession() {
    const { session_id: sessionId } = this.options;
    const token = this.options["Authorization"].split(" ")[1];
    const sessionInfo = await this.dbActionsProcessor.getSession(this.userName, sessionId);
    if (_.isEmpty(sessionInfo)) {
      throw new Error(`session id ${sessionId} is not valid`);
    }
    return JWT.verifyToken(token);
  }
  async destroySession() {
    const { session_id: sessionId } = this.options;
    return this.dbActionsProcessor.deleteSession({ sessionId, user_name: this.userName });
  }
  async destroyAllSession() {
    return this.dbActionsProcessor.deleteAllSession({ user_name: this.userName });
  }
}

module.exports = Session;
