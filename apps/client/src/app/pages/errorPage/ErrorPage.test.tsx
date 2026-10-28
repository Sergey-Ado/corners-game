import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorPage from './ErrorPage';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ErrorPage', () => {
  it('should rendered', () => {
    render(<ErrorPage />);

    const h2 = screen.getByRole('error-title');
    expect(h2).toBeInTheDocument();
  });

  it('should call navigate when click back button', () => {
    render(<ErrorPage />);

    const button = screen.getByRole('error-button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
