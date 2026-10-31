import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { Pages } from '@/types/general.types';

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

vi.mock('react-redux', () => ({
  useSelector: (fn: any) =>
    fn({
      general: {
        userdata: { id: 'id', username: 'username' },
      },
    }),
}));

describe('Header', () => {
  it('should rendered', () => {
    renderWithRouter(<Header />);
  });

  it('should call link to Welcome Page when click logo', () => {
    renderWithRouter(<Header />);

    const link = screen.getByRole('logo').closest('a');
    expect(link).toBeInTheDocument();

    expect(link?.getAttribute('href')).toBe(`/${Pages.WELCOME}`);
  });
});
