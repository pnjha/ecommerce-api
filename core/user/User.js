const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const DatabaseActions = require("./db");

class User {
  constructor(opts) {
    this.dbClient = opts.dbClient;
    this.dbActionsProcessor = new DatabaseActions(opts.dbClient);
    this.options = opts;
    this.userName = opts.user_name;
  }
  async createUser() {
    const users = await this.dbActionsProcessor.getAllUsers();
    const filteredNames = _.filter(users, (item) => item.user_name === this.userName);
    if (filteredNames.length > 0) {
      throw new Error(`User name ${this.userName} is not unique. Please try a different user name`);
    }
    const filteredEmails = _.filter(users, (item) => item.email_id === this.options.email_id);
    if (filteredEmails.length > 0) {
      throw new Error(`Email id ${this.options.email_id} is already registered. Please try a different email id`);
    }
    const userId = uuidv4();
    await this.dbActionsProcessor.createUser(userId, this.options);
  }
  async fetchUser() {
    const userInfo = await this.dbActionsProcessor.getUser(this.userName);
    if (_.isEmpty(userInfo)) {
      throw new Error(`user with username ${this.userName} does not exists`);
    }
    return userInfo;
  }
  async updateUserRole() {
    const { role } = this.options;
    return this.dbActionsProcessor.updateUserRole({ role, user_name: this.userName });
  }
}

module.exports = User;
