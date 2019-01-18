import { ConnectionOptions } from "typeorm";
import config from "../../config/config";
import env from "../../config/parameters";
import {LoggerOptions} from "../logger/Logger";

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
};

export const loadLoggerConfig = (env: "dev" | "prod") : LoggerOptions => {
  return {
    env,
    ...config.logger
  }
};

export interface AppMailerEnv {
  auth?: object,
  host: string
  port: number,
  proxy?: string
}

export const loadMailerConfig = () : AppMailerEnv => {
  return {
    auth: env.SMTP_AUTH,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    proxy: env.SMTP_PROXY,
  }
};

export interface AppPaths {
  public: string,
  views: string,
}
export const loadPaths = () : AppPaths => {
  return config.paths;
};