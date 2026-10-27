import { Languages, Themes } from '@/types/switcher.types';

enum StorageKeys {
  PREFIX = 'corners-game-',
  LANGUAGE = StorageKeys.PREFIX + 'language',
  THEME = StorageKeys.PREFIX + 'theme',
}

export function getLanguage(): Languages {
  const language = localStorage.getItem(StorageKeys.LANGUAGE);

  return typeof language === 'string' &&
    (language === 'en' || language === 'ru')
    ? language
    : 'en';
}

export function setLanguage(value: Languages): void {
  if (value === 'en' || value === 'ru')
    localStorage.setItem(StorageKeys.LANGUAGE, value);
}

export function getTheme(): Themes {
  const theme = localStorage.getItem(StorageKeys.THEME);

  return typeof theme === 'string' && (theme === 'light' || theme === 'dark')
    ? theme
    : 'light';
}

export function setTheme(value: Themes): void {
  if (value === 'light' || value === 'dark')
    localStorage.setItem(StorageKeys.THEME, value);
}
