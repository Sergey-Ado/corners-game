import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import WelcomePage from './WelcomePage';

describe('WelcomePage', () => {
  it('should rendered', () => {
    render(<WelcomePage />);
  });
});
