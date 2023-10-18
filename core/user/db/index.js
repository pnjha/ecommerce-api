const {
  getUserQueryConfig,
  createUserQueryConfig,
  updateUserRoleQueryConfig,
  getAllUsersQueryConfig
} = require("./queries");

class DatabaseActions {
  constructor({ dbClient }) {
    this.dbClient = dbClient;
  }
  async getUser(userName) {
    const { sql, values } = getUserQueryConfig(userName);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async getAllUsers() {
    const { sql, values } = getAllUsersQueryConfig();
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async createUser(userId, options) {
    const { sql, values } = createUserQueryConfig(userId, options);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async updateUserRole(options) {
    const { sql, values } = updateUserRoleQueryConfig(options);
    return this.dbClient.executePreparedStatement(sql, values);
  }
}

module.exports = DatabaseActions;
