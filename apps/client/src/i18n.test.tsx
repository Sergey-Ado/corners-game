import { describe, expect, it, vi } from 'vitest';

const useMock = vi.fn().mockReturnThis();
const initMock = vi.fn();
const changeLanguageMock = vi.fn();

vi.mock('i18next', () => ({
  default: {
    use: useMock,
    init: initMock,
    changeLanguage: changeLanguageMock,
  },
}));

describe('i18nex', () => {
  it('should init', async () => {
    await import('./i18n');

    expect(useMock).toHaveBeenCalledTimes(3);
    expect(initMock).toHaveBeenCalled();
    expect(changeLanguageMock).toHaveBeenCalled();
  });
});
