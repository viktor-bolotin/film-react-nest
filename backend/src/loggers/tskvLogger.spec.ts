import { TskvLogger } from './tskvLogger';

interface ITestData {
  message: any;
  optionalParam: any;
  additionalParam: any;
}

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let testData: ITestData;

  beforeEach(async () => {
    logger = new TskvLogger();

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

  it('.log() формирует TSKV-строку с переданными параметрами', () => {
    logger.log(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const string = consoleLogSpy.mock.calls[0][0];

    expect(string).toBe(
      `level=log\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('.error() формирует TSKV-строку с переданными параметрами', () => {
    logger.error(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const string = consoleErrorSpy.mock.calls[0][0];

    expect(string).toBe(
      `level=error\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('.warn() формирует TSKV-строку с переданными параметрами', () => {
    logger.warn(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    const string = consoleWarnSpy.mock.calls[0][0];

    expect(string).toBe(
      `level=warn\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('.debug() формирует TSKV-строку с переданными параметрами', () => {
    logger.debug(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    const string = consoleDebugSpy.mock.calls[0][0];

    expect(string).toBe(
      `level=debug\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });
});
