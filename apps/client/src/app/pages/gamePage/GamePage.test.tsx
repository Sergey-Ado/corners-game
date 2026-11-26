import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import GamePage from './GamePage';

describe('GamePage', () => {
  it('should rendered', () => {
    render(<GamePage />);
  });
});
