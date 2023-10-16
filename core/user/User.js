const _ = require("lodash");
const DatabaseActions = require("./db");

class User {
  constructor(opts) {
    this.dbClient = options.dbClient;
    this.dbActionsProcessor = new DatabaseActions(options.dbClient);
    this.options = opts;
    this.userName = opts.userName;
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
    await this.dbActionsProcessor.createUser(this.options);
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
