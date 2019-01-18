export type AppConfigType = {
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
}

export default {
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
  }
} as AppConfigType;