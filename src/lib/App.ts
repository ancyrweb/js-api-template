import Server from './Server';
import ORM from "./ORM";
import {loadORMConfig} from "./helper/loader";
import {logInfo} from "./helper/log";

class App {
  public server: Server;
  public orm: ORM;

  constructor() {
    this.orm = new ORM();
  }

  async initialize(port: number) {
    this.server = new Server(port);
    logInfo("Initializing the ORM");
    await this.orm.initialize(loadORMConfig());
  }

  async start() {
    logInfo("Starting the server");
    this.server.start();
  }
}

export default new App();



