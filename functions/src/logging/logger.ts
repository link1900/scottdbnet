// @ts-ignore
import createLogger from 'log-driver';

type LogLevel = 'info' | 'warn' | 'error' | 'trace';
type LogEventDetail = string | string[];
type LogEventMeta = object;

interface LogEvent {
  level: LogLevel;
  event?: string;
  timestamp: string;
  message: LogEventDetail;
  [key: string]: any;
}

/**
 * Logging class that provides 4 log levels ('info', 'warn', 'error', 'trace') and
 * automatically logs out in the logging standard.
 */
export class Logger {
  public enabled: boolean;
  public logGenerator: any;

  constructor() {
    this.logGenerator = createLogger({
      format: (level: LogLevel, event: LogEvent) => {
        return JSON.stringify(event);
      }
    });
    this.enabled = true;
  }

  /**
   * Log an event at the 'info' level
   * @param details Details of the log event
   * @param meta data of the log event
   */
  public info(details: LogEventDetail, meta?: LogEventMeta) {
    return this.log('info', details, meta);
  }

  /**
   * Log an event at the 'warn' level
   * @param details Details of the log event
   * @param meta data of the log event
   */
  public warn(details: LogEventDetail, meta?: LogEventMeta) {
    return this.log('warn', details, meta);
  }

  /**
   * Log an event at the 'error' level
   * @param details Details of the log event
   * @param meta data of the log event
   * @param error a javascript error related to this log
   */
  public error(details: LogEventDetail, meta?: LogEventMeta, error?: Error) {
    const errorMeta: any = meta ? meta : {};
    if (error) {
      errorMeta.errorMessage = error.toString();
      errorMeta.stacktrace = error.stack;
    }

    return this.log('error', details, errorMeta);
  }

  /**
   * Log an event at the 'trace' level
   * @param details Details of the log event
   * @param meta data of the log event
   */
  public trace(details: LogEventDetail, meta?: LogEventMeta) {
    return this.log('trace', details, meta);
  }

  /**
   * Generate a log at a level wrapped in the standard log format with the
   * trace id headers automatically added to the trace.
   * @param level Level of the log to generate
   * @param details Details of the log event
   * @param meta data of the log event
   */
  public log(level: LogLevel, details: LogEventDetail, meta?: LogEventMeta): LogEvent | undefined {
    if (!this.enabled) {
      return undefined;
    }
    const event = this.prepareStandardEvent(level, details, meta);
    this.sendToLogGenerator(event);
    return event;
  }

  protected sendToLogGenerator(event: LogEvent) {
    this.logGenerator[event.level](event);
  }

  /**
   * Prepare the event to log in JSON format. This should adhere to the
   * standard log format (LogEvent).
   * @param level Level of the log to generate
   * @param message Details of the log event
   * @param meta data of the log event
   */
  private prepareStandardEvent(level: LogLevel, message: LogEventDetail, meta?: LogEventMeta): LogEvent {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...meta
    };
  }
}

const logger = new Logger();

export default logger;

// import {Logger} from '@origin-digital/node-logger';
//
// const logger = new Logger();
//
// export function logError(message: string, error?: Error) {
//   const errorPart = error ? `${error.toString()} ${error.stack}` : '';
//   logger.error(`${message} ${errorPart}`);
// }
//
// export default logger;
