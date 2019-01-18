import * as minimist from "minimist";
import parameters, { AppParametersType } from "./parameters";

const cliArgs = minimist(process.argv.slice(2));
const env = cliArgs.env || "dev";

export type AppConfigType = {
  http: {
    port: number,
  }
  orm: {
    synchronize: boolean,
    logging: boolean,

    entities: string[]
    migrations: string[],
    subscribers: string[],
    cli: {
      entitiesDir: string,
      migrationsDir: string,
      subscribersDir: string
    }
  },
  logger: {
    path: string,
    level: string,
  },
  paths: {
    views: string,
    public: string,
  }
  parameters: AppParametersType & {
    ENV: "dev" | "prod"
  },
}

export default {
  http: {
    port: 4999,
  },
  orm: {
    synchronize: true,
    logging: true,
    entities: [
      __dirname + "/../src/orm/entity/**/*.{ts,js}"
    ],
    migrations: [
      __dirname + "/../src/orm/migration/**/*.{ts,js}"
    ],
    subscribers: [
      __dirname + "/../src/orm/subscriber/**/*.{ts,js}"
    ],
    cli: {
      entitiesDir:  __dirname + "/../src/orm/entity",
      migrationsDir:  __dirname + "/../src/orm/migration",
      subscribersDir:  __dirname + "/../src/orm/subscriber"
    }
  },
  logger: {
    level: 'info',
    path: __dirname + "/../var/logs",
  },
  paths: {
    views: __dirname + '/../views',
    public: __dirname + '/../public'
  },
  parameters: {
    ENV: env,
    ...parameters,
  }
} as AppConfigType;