import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from './RegisterPage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { HttpStatus } from '@repo/shared/api';

const renderWithRouter = (ui: ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
}));

vi.mock('@/app/store/store', () => ({
  default: {
    dispatch: mockDispatch,
  },
}));

describe('RegisterPage', () => {
  it('should rendered', () => {
    renderWithRouter(<RegisterPage />);
  });

  it('should submit if email, username and password are valid', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'userId',
            username: 'username',
            email: 'test@mail.com',
          }),
        headers: { get: vi.fn(() => 'mock-token') },
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

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

    expect(fetchMock).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
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

  it('should not call dispatch if token is empty', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'userId',
            username: 'username',
            email: 'test@mail.com',
          }),
        headers: { get: vi.fn(() => {}) },
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

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

    expect(fetchMock).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should call toast if there is error when response.ok=true', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'userId',
            username: 'username',
            email: 'test@mail.com',
          }),
        headers: {
          get: vi.fn(() => {
            throw new Error('error');
          }),
        },
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => '');

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

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    toastSpy.mockRestore();
  });

  it('should call toast if there is response.ok=false and status is 409', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: HttpStatus.CONFLICT,
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => '');

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

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not call toast if there is response.ok=false and status is not 409', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 123,
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => '');

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

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
