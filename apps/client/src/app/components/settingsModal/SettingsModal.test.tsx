import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SettingsModal from './SettingsModal';

describe('SettingsModal', () => {
  it('should rendered', () => {
    render(<SettingsModal />);

    const modal = screen.getByRole('settings-modal');
    expect(modal).toBeInTheDocument();
  });

  it('should call console.log when click cross', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<SettingsModal />);

    const cross = screen.getByRole('settings-close');
    fireEvent.click(cross);

    expect(spy).toHaveBeenCalledWith('close');

    vi.restoreAllMocks();
  });
});
