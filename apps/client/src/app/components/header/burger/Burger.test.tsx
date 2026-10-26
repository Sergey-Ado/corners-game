import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Burger from './Burger';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

describe('Burger', () => {
  it('should rendered', () => {
    render(<Burger />);

    const burger = screen.getByRole('burger');
    expect(burger).toBeInTheDocument();
  });

  it('should show burger menu when menu is closed and click avatar', () => {
    render(<Burger />);

    const avatar = screen.getByRole('avatar');
    fireEvent.click(avatar);

    const burgerMenu = screen.getByRole('burger-menu');
    expect(burgerMenu).toBeInTheDocument();
  });

  it('should close burger menu when menu is opened and click avatar', () => {
    render(<Burger />);

    const avatar = screen.getByRole('avatar');
    fireEvent.click(avatar);
    fireEvent.click(avatar);

    const burgerMenu = screen.queryByRole('burger-menu');
    expect(burgerMenu).not.toBeInTheDocument();
  });

  it('should close burger menu', () => {
    render(<Burger />);

    const avatar = screen.getByRole('avatar');
    fireEvent.click(avatar);

    const settingsIcon = screen.getByRole('settings-icon');
    fireEvent.click(settingsIcon);

    const burgerMenu = screen.queryByRole('burger-menu');
    expect(burgerMenu).not.toBeInTheDocument();
  });
});
