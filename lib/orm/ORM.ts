import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {ServiceID} from "../decorator/ServiceDecorator";
import {logInfo} from "../helper";

class ORM {
  @ServiceID("orm") public id;

  public options: ConnectionOptions;
  public connection: Connection;

  constructor(config) {
    this.options = {
      ...config.orm,
      type: config.parameters.DATABASE_TYPE,
      host: config.parameters.DATABASE_HOST,
      port: config.parameters.DATABASE_PORT,
      username: config.parameters.DATABASE_USERNAME,
      password: config.parameters.DATABASE_PASSWORD,
      database: config.parameters.DATABASE_NAME,
    }
  }

  async initializeAsync() {
    this.connection = await createConnection(this.options);
    logInfo("TypeORM Loaded");
  }

  public getRepository(type) {
    return this.connection.getRepository(type);
  }
}

export default ORM;