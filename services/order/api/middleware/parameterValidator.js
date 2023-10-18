const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

async function validateNewOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.items)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "order items cannot be empty" });
  }
  for (const product of options.product_list) {
    if (_.isEmpty(product.product_id) || _.isEmpty(product.quantity)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "product id and quantity canoot be empty" });
    }
  }
}
async function validateFetchOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.order_id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "order id cannot be empty" });
  }
}
async function validateFetchAllOrder(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.user_info)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "user id cannot be empty" });
  }
}

module.exports = {
  validateNewOrder,
  validateFetchOrder,
  validateFetchAllOrder
};
