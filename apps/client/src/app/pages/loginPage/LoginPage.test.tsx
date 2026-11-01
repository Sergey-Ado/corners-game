import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { HttpStatus } from '@repo/shared/api';

const renderWithRouter = (ui: ReactNode) => {
  render(<MemoryRouter>{ui}</MemoryRouter>);
};

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should rendered', () => {
    renderWithRouter(<LoginPage />);
  });

  it('should submit if email and password are valid', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'userId',
            username: 'username',
          }),
        headers: { get: vi.fn(() => 'mock-token') },
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
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
            email: 'test@mail.com',
          }),
        headers: { get: vi.fn(() => {}) },
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
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

    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    toastSpy.mockRestore();
  });

  it('should call toast if there is response.ok=false and status is 403', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: HttpStatus.FORBIDDEN,
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => '');

    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not call toast if there is response.ok=false and status is not 403', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 123,
      })
    );

    // @ts-expect-error For mock fetch method
    globalThis.fetch = fetchMock;

    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => '');

    renderWithRouter(<LoginPage />);

    const inputEmail = screen.getByRole('input-email');
    const inputPassword = screen.getByRole('input-password');
    const button = screen.getByRole('login-button');

    const user = userEvent.setup();

    await user.type(inputEmail, 'test@mail.ru');
    await user.type(inputPassword, 'test-password');
    await user.click(button);

    expect(fetchMock).toHaveBeenCalled();
    expect(toastSpy).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
