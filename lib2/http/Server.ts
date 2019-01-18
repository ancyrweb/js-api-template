import * as express from 'express';
import * as bodyParser from 'body-parser';
import {HttpServerInterface} from "../interface/HttpServerInterface";
import Hook from "../decorator/HookHandlerDecorator";
import {ServiceID} from "../decorator/ServiceDecorator";
import {logInfo} from "../helper";

export interface ServerRouteConfig {
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "ALL"
  path: string,
  async?: boolean
}

export type ServerRouteCallback = (req: express.Request, res: express.Response) => string | Promise<string> | void;

class Server implements HttpServerInterface {
  @ServiceID("http") public id;

  public app: express.Application;
  private port: number;

  constructor(config) {
    this.app = express();
    this.app.use(bodyParser.json());

    this.port = config.http.port;
  }


  @Hook("route")
  addRoute(config, callback) {
    this.route(config, callback);
  }

  use(app: any) {
    this.app.use(app);
  }

  set(key: string, value: any) {
    this.app.set(key, value);
  }

  mergeLocals(locals: object) {
    this.app.locals = {
      ...this.app.locals,
      ...locals
    }
  }
  start() {
    this.app.listen(this.port, () => {
      logInfo("Server is running at " + this.port);
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