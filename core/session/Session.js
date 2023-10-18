const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const DatabaseActions = require("./db");
const JWT = require("../jwt");

class Session {
  constructor(options) {
    this.dbClient = options.dbClient;
    this.dbActionsProcessor = new DatabaseActions(options.dbClient);
    this.options = options;
    this.userName = options.user_name;
  }
  async createSession() {
    const response = await fetch(`0.0.0.0:3000/v1/service/user/${this.userName}`);
    let sessionToken;
    let userInfo;
    if (response.status === StatusCodes.OK) {
      userInfo = response.json();
      if (userInfo.password_plaintext !== this.options.password) {
        throw new Error("invalid username or password");
      }
      const sessionId = uuidv4();
      sessionToken = await JWT.createToken(this.options, sessionId);
      await this.dbActionsProcessor.createSession(this.userName, sessionId);
    } else {
      if (userInfo.username !== this.userName) {
        throw new Error("invalid username or password");
      }
    }
    return { sessionId, sessionToken };
  }
  async validateSession() {
    const { session_id: sessionId } = this.options;
    const token = this.options.Authorization.split(" ")[1];
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
