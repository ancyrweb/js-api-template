
import {ConnectionOptions} from "typeorm";
import { Config as ApolloConfig } from "apollo-server-express";
import Server from './Server';
import ORM from "./ORM";
import {logInfo, logSuccess} from "./helper/log";
import GraphQLServer from "./GraphQLServer";

class App {
  public server: Server;
  public orm: ORM;
  public gqlServer: GraphQLServer;

  constructor() {
    this.orm = new ORM();
  }

  async initialize(data: {
    port: number,
    orm: ConnectionOptions,
    gql: ApolloConfig
  }) {
    this.server = new Server(data.port);

    logInfo("Initializing the ORM");
    await this.orm.initialize(data.orm);

    logInfo("Initializing the GraphQL Server");
    this.gqlServer = new GraphQLServer(data.gql);
    this.gqlServer.integrate(this.server);
    logSuccess("GraphQL server runs at localhost:" + data.port + "/graphql");
  }

  async start() {
    logInfo("Starting the server");
    this.server.start();
  }
}

export default new App();



