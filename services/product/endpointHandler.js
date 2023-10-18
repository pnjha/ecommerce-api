const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const Product = require("../../core/product/Product");

async function addProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const product = new Product(options);
  try {
    const productInfo = await product.createProduct();
    res.status(StatusCodes.CREATED).json({ product: productInfo });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function getProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const product = new Product(options);
  try {
    const productInfo = await product.getProduct();
    res.status(StatusCodes.OK).json({ product: productInfo });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function updateProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const product = new Product(options);
  try {
    const productInfo = await product.updateProduct();
    res.status(StatusCodes.OK).json({ product: productInfo });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}
async function deleteProduct(req, res) {
  const options = _.assign({}, req.body, req.params, req.query, req.headers);
  const product = new Product(options);
  try {
    await product.deleteProduct();
    res.status(StatusCodes.GONE).json({});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}

module.exports = { addProduct, getProduct, updateProduct, deleteProduct };
