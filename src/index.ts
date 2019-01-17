import "reflect-metadata";
import "./inc/gql.inc";

import App from "../lib/App";
import { AppMailerEnv, loadLoggerConfig, loadMailerConfig, loadORMConfig} from "../lib/helper/loader";
import { gqlConfig } from "../lib/helper/gqlLoader";
import { envFromArgs } from "../lib/helper/env";
import { MailerConfig } from "../lib/http/Mailer";

// === Mailing
const createMailingTransport = (env: AppMailerEnv) : MailerConfig => {
  return {
    transport: {
      host: env.host,
      port: env.port,
      secure: false,
      auth: env.auth,
    }
  }
};

(async () => {
  await App.initialize({
    env: envFromArgs(),
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4999,
    orm: loadORMConfig(),
    gql: gqlConfig(),
    logger: loadLoggerConfig(envFromArgs()),
    mailer: createMailingTransport(loadMailerConfig())
  });
  App.start();
})();
