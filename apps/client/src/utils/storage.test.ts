import { beforeEach, describe, expect, it } from 'vitest';
import { getLanguage, getTheme, setLanguage, setTheme } from './storage';

describe('getLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get en from storage if it is there', () => {
    localStorage.setItem('corners-game-language', 'en');

    expect(getLanguage()).toBe('en');
  });

  it('should get ru from storage if it is there', () => {
    localStorage.setItem('corners-game-language', 'ru');

    expect(getLanguage()).toBe('ru');
  });

  it('should get en from storage if language is not there', () => {
    localStorage.setItem('corners-game-language', 'fr');

    expect(getLanguage()).toBe('en');
  });

  it('should not set language if language is invalid', () => {
    setLanguage('en');

    setLanguage('fr' as any);

    expect(getLanguage()).toBe('en');
  });

  it('should not set theme if theme is invalid', () => {
    setTheme('light');

    setTheme('middle' as any);

    expect(getTheme()).toBe('light');
  });
});
