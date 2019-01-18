import { ApolloServer, Config } from "apollo-server-express";
import Server from "../http/Server";
import {ServiceID} from "../decorator/ServiceDecorator";
import {service} from "../helper";
import Hook from "../decorator/HookHandlerDecorator";
import {mergeResolvers, mergeTypes} from "merge-graphql-schemas";


class GraphQLServer {
  @ServiceID("gql-server") public id;

  private schemas = [];
  private queries = {};
  private mutations = {};

  server: ApolloServer;

  @Hook("gql-schema")
  addSchema(schema) {
    this.schemas.push(schema);
  }

  @Hook("gql-query")
  addQuery(name, resolver) {
    this.queries[name] = resolver;
  }
  @Hook("gql-mutation")
  addMutation(name, resolver) {
    this.mutations[name] = resolver;
  }

  initialize() {
    this.server = new ApolloServer({
      typeDefs: mergeTypes(this.schemas, { all: true }),
      resolvers: {
        // @ts-ignore
        Query: this.queries,
        Mutation: this.mutations
      }
    });

    const server = service("http") as Server;
    this.server.applyMiddleware({
      app: server.app
    });

  }
}

export default GraphQLServer;