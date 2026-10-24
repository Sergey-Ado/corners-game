import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WelcomePage from './WelcomePage';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { Pages } from '@/types/general.types';

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

  it('should call link to Login page when you click on REGISTER', () => {
    renderWithRouter(<WelcomePage />);

    const link = screen.getByRole('register-link').closest('a');
    expect(link).toBeInTheDocument();

    expect(link?.getAttribute('href')).toBe(`/${Pages.REGISTER}`);
  });
});
