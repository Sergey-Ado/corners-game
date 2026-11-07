import { beforeEach, describe, expect, it } from 'vitest';
import { StorageKeys } from '@/types/general.types';
import Storage from './storage';

describe('storage', () => {
  const storage = new Storage();

  beforeEach(() => {
    localStorage.clear();
  });

  it('should get en from storage if it is there', () => {
    localStorage.setItem(StorageKeys.LANGUAGE, 'en');

    expect(storage.getLanguage()).toBe('en');
  });

  it('should get ru from storage if it is there', () => {
    localStorage.setItem(StorageKeys.LANGUAGE, 'ru');

    expect(storage.getLanguage()).toBe('ru');
  });

  it('should get en from storage if language is not there', () => {
    localStorage.setItem(StorageKeys.LANGUAGE, 'fr');

    expect(storage.getLanguage()).toBe('en');
  });

  it('should not set language if language is invalid', () => {
    storage.setLanguage('en');

    storage.setLanguage('fr' as any);

    expect(storage.getLanguage()).toBe('en');
  });

  it('should not set theme if theme is invalid', () => {
    storage.setTheme('light');

    storage.setTheme('middle' as any);

    expect(storage.getTheme()).toBe('light');
  });

  it('should get token if token is in storage', () => {
    sessionStorage.setItem(StorageKeys.TOKEN, 'token');

    const token = storage.getToken();

    expect(token).toBe('token');
  });

  it('should remove token', () => {
    sessionStorage.setItem(StorageKeys.TOKEN, 'token');

    storage.removeToken();

    expect(sessionStorage.getItem(StorageKeys.TOKEN)).toBeNull();
  });
});
