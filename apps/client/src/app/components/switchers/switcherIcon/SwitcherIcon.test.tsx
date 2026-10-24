import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SwitcherIcon from './SwitcherIcon';

describe('SwitcherIcon', () => {
  afterEach(() => vi.restoreAllMocks());

  it('should render light theme icon', () => {
    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<SwitcherIcon iconType="light-theme" onClick={spyLog} />);

    const icon = screen.getByRole('light-theme-icon');
    expect(icon).toBeInTheDocument();

    fireEvent.click(icon);
    expect(spyLog).toHaveBeenCalled();
  });

  it('should render dark theme icon', () => {
    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<SwitcherIcon iconType="dark-theme" onClick={spyLog} />);

    const icon = screen.getByRole('dark-theme-icon');
    expect(icon).toBeInTheDocument();

    fireEvent.click(icon);
    expect(spyLog).toHaveBeenCalled();
  });

  it('should render english icon', () => {
    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<SwitcherIcon iconType="english" onClick={spyLog} />);

    const icon = screen.getByRole('english-icon');
    expect(icon).toBeInTheDocument();

    fireEvent.click(icon);
    expect(spyLog).toHaveBeenCalled();
  });

  it('should render russian icon', () => {
    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<SwitcherIcon iconType="russian" onClick={spyLog} />);

    const icon = screen.getByRole('russian-icon');
    expect(icon).toBeInTheDocument();

    fireEvent.click(icon);
    expect(spyLog).toHaveBeenCalled();
  });
});
