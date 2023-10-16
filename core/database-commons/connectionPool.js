const _ = require("lodash");
const { Pool } = require("pg");
const config = require("./config");

function getConnectionPool() {
  const connectionPoolConfig = _.isEmpty(process.env.CONNECTION_POOL_CONFIG)
    ? JSON.parse(process.env.CONNECTION_POOL_CONFIG)
    : config.pg_pool_config;
  const dbCredentials = JSON.parse(process.env.DATABASE_CREDENTIALS);
  const pool = new Pool(_.assign({}, dbCredentials, connectionPoolConfig));
  pool.on("connect", async (client) => {
    await client.query("set search_path to public");
  });
  pool.on("error", (err) => {
    logger.error("Database Pool Connection failed", err);
  });
  return pool;
}

module.exports = { getConnectionPool };
