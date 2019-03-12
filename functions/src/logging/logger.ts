// @ts-ignore
import createLogger from 'log-driver';
type LogLevel = 'info' | 'warn' | 'error' | 'trace';

/**
 * Logging class that provides 4 log levels ('info', 'warn', 'error', 'trace') and
 * automatically logs out in the logging standard.
 */
export class Logger {
  public enabled: boolean;
  public logGenerator: any;

  constructor() {
    this.enabled = true;
    this.logGenerator = createLogger({
      level: 'info',
      format: (level: LogLevel, event: any) => {
        return JSON.stringify(event);
      }
    });
  }

  public info(...messages: any[]) {
    return this.log('info', ...messages);
  }

  public warn(...messages: any[]) {
    return this.log('warn', ...messages);
  }

  public error(...messages: any[]) {
    return this.log('error', ...messages);
  }

  public trace(...messages: any[]) {
    return this.log('trace', ...messages);
  }

  public log(level: LogLevel, ...messages: any[]): any | undefined {
    if (!this.enabled) {
      return undefined;
    }
    const event = {
      level,
      messages,
      timestamp: new Date().toISOString()
    };
    this.logGenerator[event.level](event);
    return event;
  }
}

const logger = new Logger();

export default logger;
