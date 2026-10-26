import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BurgerMenu from './BurgerMenu';

const onCloseMenu = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('BurgerMenu', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should rendered', () => {
    render(<BurgerMenu onCloseMenu={onCloseMenu} />);
  });

  it('should call dispatch and closeMenu when click settings item', () => {
    render(<BurgerMenu onCloseMenu={onCloseMenu} />);

    const settingsItem = screen.getByRole('settings-icon');

    fireEvent.click(settingsItem);

    expect(mockDispatch).toHaveBeenCalled();
    expect(onCloseMenu).toHaveBeenCalled();
  });

  it('should not call closeMenu when click outside burger', () => {
    render(
      <div id="burger" role="burger">
        <BurgerMenu onCloseMenu={onCloseMenu} />
      </div>
    );

    const burgerMenu = screen.getByRole('burger');

    fireEvent.click(burgerMenu);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(onCloseMenu).not.toHaveBeenCalled();
  });
});
