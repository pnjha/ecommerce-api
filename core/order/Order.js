const { v4: uuid } = require("uuid");
const DatabaseActions = require("./db");
const properties = require("../service-commons");

class Order {
  constructor(opts) {
    this.dbClient = opts.dbClient;
    this.dbActionsProcessor = new DatabaseActions(opts.dbClient);
    this.options = opts;
  }
  async createOrder() {
    const orderId = uuid();
    const { user_info: userInfo, product_list: productList } = this.options;
    const { user_id: userId, role } = userInfo;
    if (role === properties.roles.BUYER) {
      throw new Error(`please login as buyer to create a order`);
    }
  }
  async getOrder() {
    const { order_id: orderId, user_info: userInfo } = this.options;
    const { role } = userInfo;
    if (role === properties.roles.BUYER) {
      throw new Error(`please login as buyer to fetch order details`);
    }
    return this.dbActionsProcessor.fetchOrderById(orderId);
  }
  async getAllOrders() {
    const { user_info: userInfo } = this.options;
    const { user_id: userId, role } = userInfo;
    if (role === properties.roles.BUYER) {
      throw new Error(`please login as buyer to fetch order details`);
    }
    return this.dbActionsProcessor.getOrderByUserId(userId);
  }
  async getOrdersByProducts() {
    const { user_info: userInfo } = this.options;
    const { user_id: userId, role } = userInfo;
    if (role === properties.roles.BUYER) {
      throw new Error(`please login as buyer to fetch order details`);
    }
    return this.dbActionsProcessor.getOrderByUserId(userId);
  }
}

module.exports = Order;
