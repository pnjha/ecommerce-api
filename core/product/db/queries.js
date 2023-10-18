const sqlTemplate = require("sql-template-strings");

const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const getProductByUserIdQueryConfig = (userId) =>
  getSQLConfig(sqlTemplate`select * from product where user_id=${userId}`);

const getCreateProductQueryConfig = (productId, options) => {
  const { product_name: productName, description, tags, user_id: userId } = options;
  return getSQLConfig(
    sqlTemplate`insert into product (product_id, name, description, tags, user_id) values (${productId},${productName},${description},${tags},${userId})`
  );
};
const fetchProductByIdQueryConfig = (productId) =>
  getSQLConfig(sqlTemplate`select * from product where product_id=${productId}`);

const updateProductQueryConfig = (productId, options) => {
  const { product_name: productName, description, tags, user_id: userId } = options;
  return getSQLConfig(
    sqlTemplate`update product set name=${productName}, description=${description}, tags=${tags}, user_id=${userId} where product_id=${productId})`
  );
};
const deleteProductByIdQueryConfig = (productId) =>
  getSQLConfig(sqlTemplate`delete from product where product_id=${productId}`);

module.exports = {
  getProductByUserIdQueryConfig,
  getCreateProductQueryConfig,
  fetchProductByIdQueryConfig,
  updateProductQueryConfig,
  deleteProductByIdQueryConfig
};
