import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import LangSwitcher from './LangSwitcher';
import i18next from 'i18next';

beforeEach(async () => {
  await i18next.init({
    lng: 'en',
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    resources: {
      en: { translation: {} },
      ru: { translation: {} },
    },
  });
});
describe('LangSwitcher', () => {
  it('should start in left position', () => {
    render(<LangSwitcher />);

    const circle = screen.getByRole('switcher-circle');
    expect(circle).toHaveClass('left-1');
  });

  it('moves right when Russian is selected and left when English is selected', () => {
    render(<LangSwitcher />);
    const circle = screen.getByRole('switcher-circle');

    fireEvent.click(screen.getByRole('russian-icon'));
    expect(circle).toHaveClass('left-10');

    fireEvent.click(screen.getByRole('english-icon'));
    expect(circle).toHaveClass('left-1');
  });
});
