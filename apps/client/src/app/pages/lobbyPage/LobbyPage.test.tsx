import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import LobbyPage from './LobbyPage';

vi.mock('react-redux', () => ({
  useSelector: () => vi.fn(),
}));

describe('LobbyPage', () => {
  it('should rendered', () => {
    render(<LobbyPage />);
  });
});
