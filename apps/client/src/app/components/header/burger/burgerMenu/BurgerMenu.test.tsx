import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BurgerMenu from './BurgerMenu';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

const renderWithRouter = (ui: ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const onCloseMenu = vi.fn();
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn: any) =>
    fn({
      general: {
        userdata: { id: 'userId', username: 'username' },
      },
    }),
}));

vi.mock(import('react-router'), async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const { removeTokenMock } = vi.hoisted(() => ({
  removeTokenMock: vi.fn(),
}));

vi.mock('@/utils/storage', () => ({
  default: class MockStorage {
    public removeToken(): void {
      removeTokenMock();
    }
  },
}));

describe('BurgerMenu', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should rendered', () => {
    renderWithRouter(<BurgerMenu onCloseMenu={onCloseMenu} />);
  });

  it('should call dispatch and closeMenu when click settings item', () => {
    renderWithRouter(<BurgerMenu onCloseMenu={onCloseMenu} />);

    const settingsItem = screen.getByRole('settings-icon');

    fireEvent.click(settingsItem);

    expect(mockDispatch).toHaveBeenCalled();
    expect(onCloseMenu).toHaveBeenCalled();
  });

  it('should not call closeMenu when click outside burger', () => {
    renderWithRouter(
      <div id="burger" role="burger">
        <BurgerMenu onCloseMenu={onCloseMenu} />
      </div>
    );

    const burgerMenu = screen.getByRole('burger');

    fireEvent.click(burgerMenu);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(onCloseMenu).not.toHaveBeenCalled();
  });

  it('should logout user when click logout button', async () => {
    renderWithRouter(<BurgerMenu onCloseMenu={onCloseMenu} />);

    const logoutItem = screen.getByRole('logout-icon');

    fireEvent.click(logoutItem);

    expect(onCloseMenu).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
    expect(removeTokenMock).toHaveBeenCalled();
  });
});
