import * as winston from 'winston';
import * as Transport from 'winston-transport';
import {ServiceID} from "../decorator/ServiceDecorator";

const MB = (val: number) => val * 1000000; // Return val in Megabyte

const createFileConfig = (filename: string, level: string = "info") : winston.transports.FileTransportOptions => ({
  filename,
  level,
  maxFiles: 5,
  maxsize: MB(10),
});

class Logger {
  @ServiceID("logger") public id;

  public logger: winston.Logger;

  constructor(config) {
    const env = config.parameters.ENV;

    this.logger = winston.createLogger({
      level: config.logger.level,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File(createFileConfig(config.logger.path + `/${env}.log`)),
        new winston.transports.File(createFileConfig(config.logger.path + `/${env}.error.log`, 'error')),
        ...(config.env === "prod" ? [] : [
          new winston.transports.Console({
            format: winston.format.simple()
          })
        ])
      ]
    })
  }

  addTransport(transport: Transport) {
    this.logger.add(transport);
  }
}

export default Logger;