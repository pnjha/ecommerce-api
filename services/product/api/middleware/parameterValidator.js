const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

async function validateNewProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.product_name)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "product name cannot be empty" });
  }
  if (_.isEmpty(options.product_description)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "product description cannot be empty" });
  }
}
async function validateFetchProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.product_id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "product id cannot be empty" });
  }
}
async function validateUpdateProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.product_id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "product id cannot be empty" });
  }
}
async function validateDeleteProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query);
  if (_.isEmpty(options.product_id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "product id cannot be empty" });
  }
}

module.exports = {
  validateNewProduct,
  validateFetchProduct,
  validateUpdateProduct,
  validateDeleteProduct
};
