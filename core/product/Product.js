const _ = require("lodash");
const { v4: uuid4 } = require("uuid");
const DatabaseActions = require("./db");
const properties = require("../service-commons");

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
    const { product_id: productId, name, description, tags, user_info: userInfo, quantity } = this.options;
    const { user_id: userId, role } = userInfo;
    try {
      this.dbClient.beginTransaction();
      const productInfo = await this.dbActionsProcessor.fetchProductById(productId);
      if (_.isEmpty(productInfo)) {
        throw new Error(`Product with id ${productId} not found`);
      }
      if (role !== properties.roles.BUYER && quantity !== productInfo.quantity) {
        throw new Error(`buyer cannot change product inventory`);
      }
      await this.dbActionsProcessor.updateProduct(
        productId,
        _.assign({}, productInfo, { name, description, user_id: userId, quantity, tags })
      );
      this.dbClient.commitTransaction();
    } catch (err) {
      this.dbClient.rollbackTransaction();
      throw err;
    }
  }
  async updateProductQuantity() {
    const { product_id: productId, quantity } = this.options;
    try {
      this.dbClient.beginTransaction();
      const productInfo = await this.dbActionsProcessor.fetchProductById(productId);
      if (_.isEmpty(productInfo)) {
        throw new Error(`Product with id ${productId} not found`);
      }
      if (productInfo.quantity - quantity < 0) {
        throw new Error(`insufficient quantity present in inventory for product ${productId}, try again later`);
      }
      await this.dbActionsProcessor.updateProductQuantity(productId, productInfo.quantity - quantity);
      this.dbClient.commitTransaction();
    } catch (err) {
      this.dbClient.rollbackTransaction();
      throw err;
    }
  }
  async deleteProduct() {
    const { product_id: productId } = this.options;
    return this.dbActionsProcessor.deleteProductById(productId);
  }
}

module.exports = Product;
