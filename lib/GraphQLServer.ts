import { ApolloServer, Config } from "apollo-server-express";
import Server from "./Server";

class GraphQLServer {
  server: ApolloServer;
  constructor(config: Config) {
    this.server = new ApolloServer(config);
  }
  integrate(server: Server) {
    this.server.applyMiddleware({
      app: server.getApp()
    });
  }
}

export default GraphQLServer;