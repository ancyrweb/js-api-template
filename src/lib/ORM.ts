import {Connection, ConnectionOptions, createConnection} from "typeorm";

class ORM {
  private connection: Connection;

  public async initialize(options: ConnectionOptions) {
    this.connection = await createConnection(options);
  }
}

export default ORM;