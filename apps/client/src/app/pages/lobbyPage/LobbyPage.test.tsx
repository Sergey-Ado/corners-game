import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import LobbyPage from './LobbyPage';

describe('LobbyPage', () => {
  it('should rendered', () => {
    render(<LobbyPage />);
  });
});
