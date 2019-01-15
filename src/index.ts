import "reflect-metadata";
import "./inc/gql.inc";

import App from "../lib/App";
import {loadORMConfig} from "../lib/helper/loader";
import { gqlConfig } from "../lib/helper/gqlLoader";

(async () => {
  await App.initialize({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4999,
    orm: loadORMConfig(),
    gql: gqlConfig(),
  });
  App.start();
})();
