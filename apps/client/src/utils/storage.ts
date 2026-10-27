import { Languages } from '@/types/switcher.types';

const storagePath = 'corners-game';

export function getLanguage(): Languages {
  const language = localStorage.getItem(`${storagePath}-language`);

  return typeof language === 'string' &&
    (language === 'en' || language === 'ru')
    ? language
    : 'en';
}

export function setLanguage(value: Languages): void {
  localStorage.setItem(`${storagePath}-language`, value);
}
