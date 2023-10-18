const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const Order = require("../../core/order/Order");

async function addOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const order = new Order(options);
  try {
    const orderInfo = await order.createOrder();
    res.status(StatusCodes.CREATED).json({ order: orderInfo });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function getOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const order = new Order(options);
  try {
    const orderInfo = await order.getOrder();
    res.status(StatusCodes.OK).json({ product: orderInfo });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}

async function getAllOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const order = new Order(options);
  try {
    const orders = await order.getAllOrders();
    res.status(StatusCodes.OK).json({ orders });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}

module.exports = { addOrder, getOrder, getAllOrder };
