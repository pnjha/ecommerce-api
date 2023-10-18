const _ = require("lodash");
const sqlTemplate = require("sql-template-strings");
const properties = require("../../service-commons");

const CIPHER = process.env.CIPHER;
const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const getUserQueryConfig = (userName) =>
  getSQLConfig(
    sqlTemplate`select pgp_sym_decrypt(password::bytea, ${CIPHER}) as password_plaintext, * from users where user_name=${userName}`
  );
const getAllUsersQueryConfig = () => getSQLConfig(sqlTemplate`select * from users`);
const createUserQueryConfig = (userId, options) => {
  const { user_name: userName, password, email_id: emailId } = options;
  if (_.isEmpty(options.role)) {
    options.role = [properties.roles.BUYER];
  }
  return getSQLConfig(
    sqlTemplate`insert into users (user_id, user_name, password, email_id, role) values(${userId}, ${userName}, pgp_sym_encrypt(${password}, ${CIPHER}),${emailId}, ${options.role})`
  );
};
const updateUserRoleQueryConfig = (options) => {
  const { user_name: userName, role } = options;
  return getSQLConfig(sqlTemplate`update users set role=${role} where user_name=${userName})`);
};

module.exports = {
  getUserQueryConfig,
  createUserQueryConfig,
  updateUserRoleQueryConfig,
  getAllUsersQueryConfig
};
