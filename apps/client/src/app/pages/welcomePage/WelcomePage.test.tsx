import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import WelcomePage from './WelcomePage';

describe('WelcomePage', () => {
  it('should rendered', () => {
    render(<WelcomePage />);
  });

  it('should call console.log when you click on LOGIN', async () => {
    render(<WelcomePage />);

    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const button = screen.getByRole('login-button');
    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith('login');
  });

  it('should call console.log when you click on REGISTER', async () => {
    render(<WelcomePage />);

    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const button = screen.getByRole('register-button');
    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith('register');
  });
});
