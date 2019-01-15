
import {ConnectionOptions} from "typeorm";
import { Config as ApolloConfig } from "apollo-server-express";
import Server from './http/Server';
import ORM from "./orm/ORM";
import {logInfo, logSuccess} from "./helper/log";
import GraphQLServer from "./gql/GraphQLServer";
import Validator from "../src/validation/Validator";
import Logger, {LoggerOptions} from "./logger/Logger";

class App {
  public env: string;

  public logger: Logger;
  public server: Server;
  public orm: ORM;
  public gqlServer: GraphQLServer;
  public validator: Validator;

  constructor() {
    this.orm = new ORM();
    this.validator = new Validator();
  }

  async initialize(data: {
    env: string,
    port: number,
    orm: ConnectionOptions,
    gql: ApolloConfig,
    logger: LoggerOptions,
  }) {
    this.logger = new Logger(data.logger);

    this.env = data.env;
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



