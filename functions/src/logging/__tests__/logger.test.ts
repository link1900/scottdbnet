import { Logger } from '../logger';

describe('Logger', () => {
  it('logs info correctly', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'info');
    const result = logger.info('info message', { extra: 'data' });
    expect(result && result.level).toEqual('info');
    expect(result && result.message).toEqual('info message');
    expect(result && result.extra).toEqual('data');
    expect(mock).toHaveBeenCalled();
  });

  it('logs warn correctly', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'warn');
    const result = logger.warn('warn message', { extra: 'data' });
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('warn');
    expect(result && result.message).toEqual('warn message');
    expect(result && result.extra).toEqual('data');
  });

  it('logs error correctly', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'error');
    const result = logger.error('error message', { extra: 'data' }, new Error('some error'));
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('error');
    expect(result && result.message).toEqual('error message');
    expect(result && result.extra).toEqual('data');
    expect(result && result.errorMessage).toEqual('Error: some error');
    expect(result && result.stacktrace).toBeTruthy();
  });

  it('logs error correctly with meta', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'error');
    const result = logger.error('error message');
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('error');
    expect(result && result.message).toEqual('error message');
  });

  it('logs error correctly without error', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'error');
    const result = logger.error('error message', { extra: 'data' });
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('error');
    expect(result && result.message).toEqual('error message');
    expect(result && result.extra).toEqual('data');
  });

  it('logs trace correctly', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'trace');
    const result = logger.trace('trace message', { extra: 'data' });
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('trace');
    expect(result && result.message).toEqual('trace message');
    expect(result && result.extra).toEqual('data');
  });

  it('logs correctly', () => {
    const logger = new Logger();
    const mock = jest.spyOn(logger, 'log');
    const result = logger.log('info', 'log message');
    expect(mock).toHaveBeenCalled();
    expect(result && result.level).toEqual('info');
    expect(result && result.message).toEqual('log message');
    expect(result && result.timestamp).toBeTruthy();
    expect(result && result.trace).toBeFalsy();
  });

  it('does not log if disabled', () => {
    const logger = new Logger();
    logger.enabled = false;
    const result = logger.log('info', 'log message');
    expect(result).toBeFalsy();
  });
});
