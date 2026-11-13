import { afterEach, describe, expect, it, vi } from 'vitest';
import colors from 'colors';
import { beforeEach } from 'node:test';
import process from 'node:process';

const userId = 'userId';
const event: any = 'event';
const payload = 'payload';
const message = 'message';
const method = 'POST';
const url = 'mockUrl';
const body = 'mockBody';
const statusCode = 201;

const OLD_ENV = { ...process.env };

describe('getLogger', () => {
  it('should return instance of singleton class', async () => {
    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const firstInstance = getLogger();
    const secondInstance = getLogger();

    expect(firstInstance === secondInstance).toBeTruthy();
  });
});

describe('Logger.emit', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...OLD_ENV };
  });

  it('should call console.log when SHOW_LOG is equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.emit([userId], event, payload);

    expect(spyLog).toHaveBeenCalledWith(
      colors.yellow(event),
      colors.green('TO'),
      ['userId']
    );
    expect(spyLog).toHaveBeenCalledWith('payload:', payload);
  });

  it('should not call console.log when SHOW_LOG is not equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'no';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.emit([userId], event, payload);

    expect(spyLog).not.toHaveBeenCalledWith();
  });

  it('should not call console.log with empty payload', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.emit([userId], event, undefined);

    expect(spyLog).toHaveBeenCalledWith(
      colors.yellow(event),
      colors.green('TO'),
      ['userId']
    );
    expect(spyLog).not.toHaveBeenCalledWith('payload:', payload);
  });
});

describe('Logger.on', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...OLD_ENV };
  });

  it('should call console.log when SHOW_LOG is equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.on(userId, event, payload);

    expect(spyLog).toHaveBeenCalledWith(
      colors.magenta(event),
      colors.green('FROM'),
      'userId'
    );
    expect(spyLog).toHaveBeenCalledWith('payload:', payload);
  });

  it('should not call console.log when SHOW_LOG is not equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'no';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.on(userId, event, payload);

    expect(spyLog).not.toHaveBeenCalledWith();
  });

  it('should not call console.log with empty payload', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.on(userId, event, undefined);

    expect(spyLog).toHaveBeenCalledWith(
      colors.magenta(event),
      colors.green('FROM'),
      'userId'
    );
    expect(spyLog).not.toHaveBeenCalledWith('payload:', payload);
  });
});

describe('Logger.info', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...OLD_ENV };
  });

  it('should call console.log when SHOW_LOG is equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.info(message);

    expect(spyLog).toHaveBeenCalledWith(colors.blue(message));
  });

  it('should not call console.log when SHOW_LOG is not equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'no';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.info(message);

    expect(spyLog).not.toHaveBeenCalledWith();
  });
});

describe('Logger.request', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...OLD_ENV };
  });

  it('should call console.log when SHOW_LOG is equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.request(method, url, body);

    expect(spyLog).toHaveBeenCalledWith(
      colors.magenta('Request:'),
      colors.green(method),
      colors.green(url)
    );
    expect(spyLog).toHaveBeenCalledWith('body:', body);
  });

  it('should not call console.log when SHOW_LOG is not equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'no';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.request(method, url, body);

    expect(spyLog).not.toHaveBeenCalledWith();
  });

  it('should not call console.log with empty body', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.request(method, url, undefined);

    expect(spyLog).toHaveBeenCalledWith(
      colors.magenta('Request:'),
      colors.green(method),
      colors.green(url)
    );
    expect(spyLog).not.toHaveBeenCalledWith('body:', body);
  });
});

describe('Logger.response', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...OLD_ENV };
  });

  it('should call console.log when SHOW_LOG is equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.response(method, url, statusCode, body);

    expect(spyLog).toHaveBeenCalledWith(
      colors.yellow('Response: '),
      colors.green(method),
      colors.green(url),
      colors.red(statusCode.toString())
    );
    expect(spyLog).toHaveBeenCalledWith('body:', body);
  });

  it('should not call console.log when SHOW_LOG is not equal to yes', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'no';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.response(method, url, statusCode, body);

    expect(spyLog).not.toHaveBeenCalledWith();
  });

  it('should not call console.log with empty body', async () => {
    vi.resetModules();
    process.env.SHOW_LOG = 'yes';

    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { default: getLogger } = await import('../../src/utils/logger.ts');

    const logger = getLogger();

    logger.response(method, url, statusCode, undefined);

    expect(spyLog).toHaveBeenCalledWith(
      colors.yellow('Response: '),
      colors.green(method),
      colors.green(url),
      colors.red(statusCode.toString())
    );
    expect(spyLog).not.toHaveBeenCalledWith('body:', body);
  });
});
