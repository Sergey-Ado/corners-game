import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: ReactNode) => {
  render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('LoginPage', () => {
  it('should rendered', () => {
    renderWithRouter(<LoginPage />);
  });

  it('should submit if email and password are valid', async () => {
    renderWithRouter(<LoginPage />);

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    expect(spy).toHaveBeenCalled();
  });

  it('should show message if email is invalid', async () => {
    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'invalid-email');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    const errorEmail = screen.getByRole('error-email');
    expect(errorEmail).toBeInTheDocument();
  });

  it('should show message if password is invalid', async () => {
    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ro');
    await user.type(inputPassword, 'invalid password');
    await user.click(button);

    const errorEmail = screen.getByRole('error-password');
    expect(errorEmail).toBeInTheDocument();
  });
});
