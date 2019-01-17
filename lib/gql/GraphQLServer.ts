import { ApolloServer, Config } from "apollo-server-express";
import Server from "../http/Server";

class GraphQLServer {
  server: ApolloServer;
  constructor(config: Config) {
    this.server = new ApolloServer(config);
  }
  integrate(server: Server) {
    this.server.applyMiddleware({
      app: server.app
    });
  }
}

export default GraphQLServer;