import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmptyAvatar from './EmptyAvatar';

describe('EmptyAvatar', () => {
  it('should rendered', () => {
    render(<EmptyAvatar />);

    const avatar = screen.getByRole('empty-avatar');

    expect(avatar).toBeInTheDocument();
  });
});
