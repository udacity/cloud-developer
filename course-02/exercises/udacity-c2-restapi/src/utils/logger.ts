import * as Sentry from '@sentry/node';
import { config } from './../config/config';
import winston from 'winston';

// const sentryChannel:string = config.sentryChannel || 'https://581e6338acc1480198196aceb2586ebc@o414265.ingest.sentry.io/5303427';
const sentryChannel:string = null;

export const logger = (() => {
  if (!sentryChannel) {
    return createWinstonLogger();
  } else {
    Sentry.init({ dsn: `${sentryChannel}` });
      return {
        info: (message:string) => { Sentry.captureMessage(message) },
        error: (exception:string) => { Sentry.captureException(exception) }
    }
  }
})();


// Source for this pattern is https://github.com/winstonjs/winston#usage
function createWinstonLogger() {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'udagram-rest-api' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger;
}
