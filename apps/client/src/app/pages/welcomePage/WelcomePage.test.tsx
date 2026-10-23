import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import WelcomePage from './WelcomePage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { Pages } from '@/types/general';

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('WelcomePage', () => {
  it('should rendered', () => {
    renderWithRouter(<WelcomePage />);

    const h1 = screen.getByRole('game-name').closest('h1');
    expect(h1).toBeInTheDocument();
  });

  it('should call link to Login page when you click on LOGIN', () => {
    renderWithRouter(<WelcomePage />);

    const link = screen.getByRole('login-link').closest('a');
    expect(link).toBeInTheDocument();

    expect(link?.getAttribute('href')).toBe(`/${Pages.LOGIN}`);
  });

  it('should call console.log when you click on REGISTER', async () => {
    renderWithRouter(<WelcomePage />);

    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const button = screen.getByRole('register-button');
    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith('register');
  });
});
