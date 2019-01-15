import App from "../App";

export const logInfo = (msg, ...args) => App.logger.logger.info(`JAT: ${msg}`, ...args);
export const logSuccess = (msg, ...args) => App.logger.logger.info(`JAT: ${msg}`, ...args);
export const logError = (msg, ...args) => App.logger.logger.error(`JAT: ${msg}`, ...args);
export const logWarning = (msg, ...args) => App.logger.logger.warning(`JAT: ${msg}`, ...args);