import * as winston from 'winston';
import * as Transport from 'winston-transport';

export type LoggerOptions = {
  env: "dev" | "prod",
  level: string,
  path: string
}

const MB = (val: number) => val * 1000000; // Return val in Megabyte

const createFileConfig = (filename: string, level: string = "info") : winston.transports.FileTransportOptions => ({
  filename,
  level,
  maxFiles: 5,
  maxsize: MB(10),
});

class Logger {
  public logger: winston.Logger;

  constructor(options: LoggerOptions) {
    this.logger = winston.createLogger({
      level: options.level,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File(createFileConfig(options.path + `/${options.env}.log`)),
        new winston.transports.File(createFileConfig(options.path + `/${options.env}.error.log`, 'error')),
        ...(options.env === "prod" ? [] : [
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