import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThemeSwitcher from './ThemeSwitcher';

describe('LangSwitcher', () => {
  it('should start in left position', () => {
    render(<ThemeSwitcher />);

    const circle = screen.getByRole('switcher-circle');
    expect(circle).toHaveClass('left-1');
  });

  it('moves right when Russian is selected and left when English is selected', () => {
    render(<ThemeSwitcher />);
    const circle = screen.getByRole('switcher-circle');

    fireEvent.click(screen.getByRole('dark-theme-icon'));
    expect(circle).toHaveClass('left-10');

    fireEvent.click(screen.getByRole('light-theme-icon'));
    expect(circle).toHaveClass('left-1');
  });
});
