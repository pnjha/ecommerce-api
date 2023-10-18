const { getConnectionPool } = require("../../../../core/database-commons/connectionPool");

async function addDatabaseContext(req, res) {
  const connectionPool = await getConnectionPool();
  const dbClient = await connectionPool.connect();
  req.db = dbClient;
  const closeResponse = res.end;
  res.end = function closeConnection(...args) {
    dbClient.release();
    delete req.db;
    res.end = closeResponse;
    res.end.apply(res, args);
    return res;
  };
}

module.exports = addDatabaseContext;
