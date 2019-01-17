import * as express from 'express';
import * as bodyParser from 'body-parser';
import { logSuccess } from "../helper/log";

export interface ServerRouteConfig {
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "ALL"
  path: string,
  async?: boolean
}

export type ServerRouteCallback = (req: express.Request, res: express.Response) => string | Promise<string> | void;

class Server {
  public app: express.Application;
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
      logSuccess(`Server is running on port ${this.port}`);
    })
  }

  route(config: ServerRouteConfig, callback: ServerRouteCallback) {
    this.app[config.method.toLowerCase()](config.path, async (req, res) => {
      if (config.async === true) {
        return callback(req, res);
      }

      const result = await callback(req, res);
      if (result) {
        res.send(result);
      }
    })
  }
}

export default Server;