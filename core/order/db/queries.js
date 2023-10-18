const sqlTemplate = require("sql-template-strings");

const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const getOrderByUserIdQueryConfig = (userId) => getSQLConfig(sqlTemplate`select * from order where user_id=${userId}`);

const getCreateOrderQueryConfig = (orderId, options) => {
  const { product_list: productList, user_id: userId } = options;
  return getSQLConfig(
    sqlTemplate`insert into order (order_id, user_id, product_list) values (${orderId},${userId},${productList})`
  );
};
const fetchOrderByIdQueryConfig = (orderId) => getSQLConfig(sqlTemplate`select * from order where order_id=${orderId}`);

module.exports = {
  getOrderByUserIdQueryConfig,
  getCreateOrderQueryConfig,
  fetchOrderByIdQueryConfig
};
