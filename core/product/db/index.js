const {
  getProductByUserIdQueryConfig,
  getCreateProductQueryConfig,
  fetchProductByIdQueryConfig,
  updateProductQueryConfig,
  deleteProductByIdQueryConfig
} = require("./queries");

class DatabaseActions {
  constructor({ dbClient }) {
    this.dbClient = dbClient;
  }
  async getProductByUserId(userId) {
    const { sql, values } = getProductByUserIdQueryConfig(userId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async addProduct(productId, options) {
    const { sql, values } = getCreateProductQueryConfig(productId, options);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async fetchProductById(productId) {
    const { sql, values } = fetchProductByIdQueryConfig(productId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async updateProduct(productId, options) {
    const { sql, values } = updateProductQueryConfig(productId, options);
    return this.dbClient.executePreparedStatement(sql, values);
  }
  async deleteProductById(productId) {
    const { sql, values } = deleteProductByIdQueryConfig(productId);
    return this.dbClient.executePreparedStatement(sql, values);
  }
}

module.exports = DatabaseActions;
