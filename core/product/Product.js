const _ = require("lodash");
const { v4: uuid4 } = require("uuid");
const DatabaseActions = require("./db");

class Product {
  constructor(opts) {
    this.dbClient = opts.dbClient;
    this.dbActionsProcessor = new DatabaseActions(opts.dbClient);
    this.options = opts;
    this.userName = opts.user_name;
  }
  async getProductsByUserId() {
    const { user_info: userInfo } = this.options;
    const { user_id: userId } = userInfo;
    return this.dbActionsProcessor.getProductByUserId(userId);
  }
  async createProduct() {
    const productId = uuid4();
    return this.dbActionsProcessor.addProduct(productId, this.options);
  }
  async getProduct() {
    const { product_id: productId } = this.options;
    return this.dbActionsProcessor.fetchProductById(productId);
  }
  async updateProduct() {
    const { product_id: productId } = this.options;
    const productInfo = await this.dbActionsProcessor.fetchProductById(productId);
    if (_.isEmpty(productInfo)) {
      throw new Error(`Product with id ${productId} not found`);
    }
    await this.dbActionsProcessor.updateProduct(productId, this.options);
  }
  async deleteProduct() {
    const { product_id: productId } = this.options;
    return this.dbActionsProcessor.deleteProductById(productId);
  }
}

module.exports = Product;
