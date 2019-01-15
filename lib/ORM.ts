import {Connection, ConnectionOptions, createConnection} from "typeorm";

class ORM {
  public connection: Connection;

  public async initialize(options: ConnectionOptions) {
    this.connection = await createConnection(options);
  }

  public getRepository(type) {
    return this.connection.getRepository(type);
  }
}

export default ORM;