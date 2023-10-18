const sqlTemplate = require("sql-template-strings");

const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const getProductByUserIdQueryConfig = (userId) =>
  getSQLConfig(sqlTemplate`select * from product where user_id=${userId}`);

const getCreateProductQueryConfig = (productId, options) => {
  const { name, description, tags, user_id: userId, quantity } = options;
  return getSQLConfig(
    sqlTemplate`insert into product (product_id, name, description, quantity, tags, user_id) values (${productId},${name},${description},${tags},${userId},${quantity})`
  );
};
const fetchProductByIdQueryConfig = (productId) =>
  getSQLConfig(sqlTemplate`select * from product where product_id=${productId} for update`);

const updateProductQueryConfig = (productId, options) => {
  const { name, description, tags, user_id: userId, quantity } = options;
  return getSQLConfig(
    sqlTemplate`update product set name=${name}, description=${description}, tags=${tags}, user_id=${userId}, quantity=${quantity} where product_id=${productId})`
  );
};
const updateProductQuantity = (productId, quantity) =>
  getSQLConfig(sqlTemplate`update product set quantity=${quantity} where product_id=${productId}`);

const deleteProductByIdQueryConfig = (productId) =>
  getSQLConfig(sqlTemplate`delete from product where product_id=${productId}`);

module.exports = {
  getProductByUserIdQueryConfig,
  getCreateProductQueryConfig,
  fetchProductByIdQueryConfig,
  updateProductQueryConfig,
  deleteProductByIdQueryConfig,
  updateProductQuantity
};
