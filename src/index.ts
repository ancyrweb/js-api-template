import "reflect-metadata";
import "./inc/gql.inc";

import * as minimist from "minimist";

import App from "../lib/App";
import {loadLoggerConfig, loadORMConfig} from "../lib/helper/loader";
import { gqlConfig } from "../lib/helper/gqlLoader";


const cliArgs = minimist(process.argv.slice(2));
const env = cliArgs.env || "dev";

(async () => {
  await App.initialize({
    env: env,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4999,
    orm: loadORMConfig(),
    gql: gqlConfig(),
    logger: loadLoggerConfig(env)
  });
  App.start();
})();
