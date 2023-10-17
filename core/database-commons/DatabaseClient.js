function queryLog(str) {
  console.log(`executing query: ${str}`);
}

class DatabaseClient {
  constructor(dbClient) {
    this.db = dbClient;
  }
  async beginTransaction() {
    queryLog("BEGIN");
    await this.db.query("BEGIN");
  }
  async commitTransaction() {
    queryLog("COMMIT");
    await this.db.query("COMMIT");
  }
  async rollbackTransaction() {
    queryLog("ROLLBACK");
    await this.db.query("ROLLBACK");
  }
  async executePreparedStatement(query, values) {
    queryLog(query);
    return this.db.query(query, values);
  }
  async executeStatement(query) {
    queryLog(query);
    return this.db.query(query);
  }
  async executeAtomically(mainFn, cleanup) {
    try {
      await this.beginTransaction();
      const out = await mainFn();
      await this.commitTransaction();
      return out;
    } catch (err) {
      await this.rollbackTransaction();
      const thrown = await cleanup(err);
      throw thrown;
    }
  }
}

module.exports = new DatabaseClient();
