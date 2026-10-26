import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BurgerItem from './BurgerItem';

describe('BurgerItem', () => {
  it('should rendered', () => {
    render(
      <BurgerItem iconType="settings" title="settings" onClick={() => {}} />
    );

    const item = screen.getByRole('burger-item');
    expect(item).toBeInTheDocument();
  });
});
