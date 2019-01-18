import App from "./App";
import Logger from "./logger/Logger";

export const hook = (name, ...data) => App.hook(name, ...data);
export const route = (config, callback) => App.hook("route", config, callback);
export const service = (name: string) => App.service(name);

export const logInfo = (msg, ...params) => (App.service("logger") as Logger).logger.info(msg);
export const logWarning = (msg, ...params) => (App.service("logger") as Logger).logger.warning(msg);
export const logError = (msg, ...params) => (App.service("logger") as Logger).logger.error(msg);