import { JsonLogger } from './jsonLogger';

interface ITestData {
  message: any;
  optionalParam: any;
  additionalParam: any;
}

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let testData: ITestData;

  beforeEach(async () => {
    logger = new JsonLogger();

    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

    testData = {
      message: 'message',
      optionalParam: 'optionalParam',
      additionalParam: 'additionalParam',
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('.log() вызывает console.log с переданными параметрами', () => {
    logger.log(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const callData = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(callData);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam,
      testData.additionalParam,
    ]);
  });

  it('.error() вызывает console.error с переданными параметрами', () => {
    logger.error(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const callData = consoleErrorSpy.mock.calls[0][0];
    const parsed = JSON.parse(callData);

    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam,
      testData.additionalParam,
    ]);
  });

  it('.warn() вызывает console.warn с переданными параметрами', () => {
    logger.warn(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    const callData = consoleWarnSpy.mock.calls[0][0];
    const parsed = JSON.parse(callData);

    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam,
      testData.additionalParam,
    ]);
  });

  it('.debug() вызывает console.debug с переданными параметрами', () => {
    logger.debug(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    const callData = consoleDebugSpy.mock.calls[0][0];
    const parsed = JSON.parse(callData);

    expect(parsed.level).toBe('debug');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam,
      testData.additionalParam,
    ]);
  });
});
