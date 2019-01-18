import "reflect-metadata";
import "./inc/route.inc";
import "./inc/gql.inc";

import App from '../lib/App';
import config from "../config/config";
import Server from "../lib/http/Server";
import Logger from "../lib/logger/Logger";
import ORM from "../lib/orm/ORM";
import GraphQLServer from "../lib/gql/GraphQLServer";
import Validator from "../lib/validation/Validator";
import Mailer from "../lib/http/Mailer";
import Templating from "../lib/template/Templating";

App
  .add(Server)
  .add(Logger)
  .add(ORM)
  .add(Validator)
  .add(Mailer, (config) => {
    return [{
      host: config.parameters.SMTP_HOST,
      port: config.parameters.SMTP_PORT,
      secure: false,
      auth: config.parameters.SMTP_AUTH,
    }]
  })
  .add(GraphQLServer)
  .add(Templating);

(async () => {
  await App.init(config);
  (App.service("http") as Server).start();
})();
