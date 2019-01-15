import * as express from 'express';
import * as bodyParser from 'body-parser';
import {logInfo} from "./helper/log";

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.app.use(bodyParser.json());


    this.port = port;
  }

  use(app: express.Application) {
    this.app.use(app);
  }

  start() {
    this.app.listen(this.port, () => {
      logInfo(`Server is running on port ${this.port}`);
    })
  }

  getApp() {
    return this.app;
  }
}

export default Server;