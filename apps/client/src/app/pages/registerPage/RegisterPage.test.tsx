import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RegisterPage from './RegisterPage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('RegisterPage', () => {
  it('should rendered', () => {
    renderWithRouter(<RegisterPage />);
  });

  it('should submit if email, username and password are valid', async () => {
    renderWithRouter(<RegisterPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputUsername = screen.getByRole('input-username');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('register-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputUsername, 'John Doe');
    await user.type(inputPassword, 'test-password');
    await user.click(button);
  });

  it('should show message if email is invalid', async () => {
    renderWithRouter(<RegisterPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputUsername = screen.getByRole('input-username');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('register-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'invalid-mail');
    await user.type(inputUsername, 'John Doe');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    const errorEmail = screen.getByRole('error-email');
    expect(errorEmail).toBeInTheDocument();
  });

  it('should show message if username is invalid', async () => {
    renderWithRouter(<RegisterPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputUsername = screen.getByRole('input-username');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('register-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputUsername, 'John');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    const errorUsername = screen.getByRole('error-username');
    expect(errorUsername).toBeInTheDocument();
  });

  it('should show message if password is invalid', async () => {
    renderWithRouter(<RegisterPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputUsername = screen.getByRole('input-username');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('register-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputUsername, 'John Doe');
    await user.type(inputPassword, 'test');
    await user.click(button);

    const errorPassword = screen.getByRole('error-password');
    expect(errorPassword).toBeInTheDocument();
  });
});
