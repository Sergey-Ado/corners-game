import { StorageKeys } from '@/types/general.types';
import { Languages, Themes } from '@/types/switcher.types';

export default class Storage {
  public constructor(
    private languagePath = StorageKeys.LANGUAGE,
    private themePath = StorageKeys.THEME,
    private tokenPath = StorageKeys.TOKEN
  ) {}

  public getLanguage(): Languages {
    const language = localStorage.getItem(this.languagePath);

    return typeof language === 'string' &&
      (language === 'en' || language === 'ru')
      ? language
      : 'en';
  }

  public setLanguage(value: Languages): void {
    if (value === 'en' || value === 'ru')
      localStorage.setItem(this.languagePath, value);
  }

  public getTheme(): Themes {
    const theme = localStorage.getItem(this.themePath);

    return typeof theme === 'string' && (theme === 'light' || theme === 'dark')
      ? theme
      : 'light';
  }

  public setTheme(value: Themes): void {
    if (value === 'light' || value === 'dark')
      localStorage.setItem(this.themePath, value);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenPath);
  }

  public setToken(value: string): void {
    sessionStorage.setItem(this.tokenPath, value);
  }

  public removeToken(): void {
    sessionStorage.removeItem(this.tokenPath);
  }
}
