import { ConnectionOptions } from "typeorm";
import config from "../../config/config";
import env from "../../config/env";

export const loadORMConfig = () : ConnectionOptions => {
  return {
    ...config.orm,
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  }
}