import "reflect-metadata";
import "./inc/route.inc";
import "./inc/gql.inc";

import App from '../lib2/App';
import config from "../config/config";
import Server from "../lib2/http/Server";
import Logger from "../lib2/logger/Logger";
import ORM from "../lib2/orm/ORM";
import GraphQLServer from "../lib2/gql/GraphQLServer";

App
  .add(Server)
  .add(Logger)
  .add(ORM)
  .add(GraphQLServer);

(async () => {
  await App.init(config);
  (App.service("http") as Server).start();
})();
