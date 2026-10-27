import { beforeEach, describe, expect, it } from 'vitest';
import { getLanguage } from './storage';

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
});
