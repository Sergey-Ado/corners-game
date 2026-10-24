import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LangSwitcher from './LangSwitcher';

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
