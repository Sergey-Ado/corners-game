import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CrossButton from './CrossButton';

describe('CrossButton', () => {
  it('should rendered', () => {
    const callback = vi.fn();

    render(<CrossButton onCloseHandler={callback} />);

    const cross = screen.getByRole('settings-close');
    expect(cross).toBeInTheDocument();
  });

  it('should call callback when click cross', () => {
    const callback = vi.fn();

    render(<CrossButton onCloseHandler={callback} />);

    const cross = screen.getByRole('settings-close');
    fireEvent.click(cross);

    expect(callback).toHaveBeenCalled();
  });
});
