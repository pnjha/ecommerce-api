const { getOrderByUserIdQueryConfig, getCreateOrderQueryConfig, fetchOrderByIdQueryConfig } = require("./queries");

class DatabaseActions {
  constructor({ dbClient }) {
    this.dbClient = dbClient;
  }
  async getOrderByUserId(userId) {
    const { sql, values } = getOrderByUserIdQueryConfig(userId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async addOrder(orderId, options) {
    const { sql, values } = getCreateOrderQueryConfig(orderId, options);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async fetchOrderById(orderId) {
    const { sql, values } = fetchOrderByIdQueryConfig(orderId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
}

module.exports = DatabaseActions;
