const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const port = process.env.PORT || 4000;

class UserService {
  constructor() {
    this.serviceName = "user-service";
    this.appRouter = express();
  }
  initializeRoutes() {
    this.appRouter.use(bodyParser.urlencoded({ extended: false }));
    this.appRouter.use(bodyParser.json());
    this.appRouter.get("/healthcheck", async (req, res) => {
      res.status(200).json({ healthy: true });
    });
    this.appRouter.use("/v1/service", router);
  }
  async promisifiedListen() {
    return new Promise((resolve, reject) => {
      this.appRouter.on("error", (err) => {
        console.log(`service ${this.serviceName} failed with error ${err}`);
        reject(err);
      });
      this.appRouter.listen(port, () => {
        console.log(`${this.serviceName} started listening on port ${port}`);
        resolve();
      });
    });
  }
  async run() {
    this.initializeRoutes();
    await this.promisifiedListen();
  }
}

module.exports = UserService;
