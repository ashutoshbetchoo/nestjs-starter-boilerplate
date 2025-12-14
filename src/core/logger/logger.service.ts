import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
              ({ timestamp, level, message, context, meta }) => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
                return `${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message} ${meta ? JSON.stringify(meta) : ''}`;
              },
            ),
          ),
        }),
      ],
    });
  }

  log(message: string, context?: string, meta?: object) {
    this.logger.info(message, { context, meta });
  }

  error(message: string, trace?: string, context?: string, meta?: object) {
    this.logger.error(message, { trace, context, meta });
  }

  warn(message: string, context?: string, meta?: object) {
    this.logger.warn(message, { context, meta });
  }

  debug(message: string, context?: string, meta?: object) {
    this.logger.debug(message, { context, meta });
  }

  verbose(message: string, context?: string, meta?: object) {
    this.logger.verbose(message, { context, meta });
  }
}
