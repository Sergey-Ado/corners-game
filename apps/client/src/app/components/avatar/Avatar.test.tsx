import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('should rendered', () => {
    render(<Avatar />);

    const avatar = screen.getByRole('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should call callback when it is clicked', () => {
    const callback = vi.fn();

    render(<Avatar onClick={callback} />);

    const avatar = screen.getByRole('avatar');
    fireEvent.click(avatar);
    expect(callback).toHaveBeenCalled();
  });

  it('should call default callback with it is clicked', () => {
    render(<Avatar />);

    const avatar = screen.getByRole('avatar');

    expect(() => fireEvent.click(avatar)).not.toThrow();
  });
});
