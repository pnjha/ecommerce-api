const {
  createSessionQueryConfig,
  deleteSessionQueryConfig,
  deleteAllSessionQueryConfig,
  getSessionQueryConfig
} = require("./queries");

class DatabaseActions {
  constructor({ dbClient }) {
    this.dbClient = dbClient;
  }
  async createSession(userName, sessionId) {
    const { sql, values } = createSessionQueryConfig(userName, sessionId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async getSession(userName, sessionId) {
    const { sql, values } = getSessionQueryConfig(userName, sessionId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async deleteSession(userName, sessionId) {
    const { sql, values } = deleteSessionQueryConfig(userName, sessionId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async deleteAllSession(userName) {
    const { sql, values } = deleteAllSessionQueryConfig(userName);
    return this.dbClient.executePreparedStatement(sql, values);
  }
}
module.exports = DatabaseActions;
