import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BurgerIcon from './BurgerIcon';

describe('BurgerIcon', () => {
  it('should render settings icon', () => {
    render(<BurgerIcon iconType="settings" />);

    const icon = screen.getByRole('settings-icon');
    expect(icon).toBeInTheDocument();
  });
});
