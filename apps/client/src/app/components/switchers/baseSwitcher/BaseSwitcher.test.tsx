import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BaseSwitcher from './BaseSwitcher';

describe('BaseSwitcher', () => {
  it('should rendered', () => {
    const leftIcon = <div>leftIcon</div>;
    const rightIcon = <div>rightIcon</div>;

    render(
      <BaseSwitcher position="left" leftIcon={leftIcon} rightIcon={rightIcon} />
    );

    expect(screen.getByText('leftIcon')).toBeInTheDocument();
    expect(screen.getByText('rightIcon')).toBeInTheDocument();
  });

  it('should have left of circle equal to 10 if position equals right', () => {
    const leftIcon = <div>leftIcon</div>;
    const rightIcon = <div>rightIcon</div>;

    render(
      <BaseSwitcher
        position="right"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    );

    const circle = screen.getByRole('switcher-circle');
    expect(circle).toHaveClass('left-10');
  });
});
