const _ = require("lodash");
const sqlTemplate = require("sql-template-strings");

const getSQLConfig = (stmt) => ({ sql: stmt.text, values: stmt.values });

const createSessionQueryConfig = (userName, sessionId) => {
  return getSQLConfig(sqlTemplate`insert into session (user_name, session_id) values(${userName}, ${sessionId})`);
};
const getSessionQueryConfig = (userName, sessionId) => {
  return getSQLConfig(sqlTemplate`select * from session where user_name=${userName}, session_name=${sessionId}`);
};
const deleteSessionQueryConfig = (userName, sessionId) => {
  return getSQLConfig(sqlTemplate`delete from session where user_name=${userName}, session_name=${sessionId}`);
};
const deleteAllSessionQueryConfig = (userName) => {
  return getSQLConfig(sqlTemplate`delete from session where user_name=${userName}`);
};

module.exports = {
  createSessionQueryConfig,
  getSessionQueryConfig,
  deleteSessionQueryConfig,
  deleteAllSessionQueryConfig
};
