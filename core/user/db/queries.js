const _ = require("lodash");
const sqlTemplate = require("sql-template-strings");
const properties = require("../properties");

const CIPHER = process.env.CIPHER;
const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const getUserQueryConfig = (userName) => {
  return getSQLConfig(
    sqlTemplate`select pgp_sym_decrypt(password::bytea, ${CIPHER}) as password_plaintext, * from users where user_name=${userName}`
  );
};
const getAllUsersQueryConfig = () => {
  return getSQLConfig(sqlTemplate`select * from users`);
};
const createUserQueryConfig = (options) => {
  const { user_name: userName, password, email_id: emailId, role } = options;
  if (_.isEmpty(role)) {
    role = [properties.roles.BUYER];
  }
  return getSQLConfig(
    sqlTemplate`insert into users (user_name, password, email_id, role) values(${userName}, pgp_sym_encrypt(${password}, ${CIPHER}),${emailId}, ${role})`
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
