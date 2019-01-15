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
  }
}

export default {
  orm: {
    synchronize: true,
    logging: false,
    entities: [
      "src/orm/entity/**/*.ts"
    ],
    migrations: [
      "src/orm/migration/**/*.ts"
    ],
    subscribers: [
      "src/orm/subscriber/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/orm/entity",
      migrationsDir: "src/orm/migration",
      subscribersDir: "src/orm/subscriber"
    }
  }
} as AppConfigType;