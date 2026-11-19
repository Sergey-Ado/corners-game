import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LobbyPage from './LobbyPage';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';
import { RootState } from '@/app/store/store';

const roomData: RoomData[] = [
  {
    id: 'roomId1',
    owner: { id: 'userId1', username: 'username1' },
    guest: null,
  },
  {
    id: 'roomId2',
    owner: { id: 'userId2', username: 'username2' },
    guest: null,
  },
];

const mockSocket: Partial<TypedSocket> = {
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('react-redux', () => ({
  useSelector: (selector: (state: RootState) => string) =>
    selector({ general: { userdata: { id: 'userId1' } } } as RootState),
}));

vi.mock('react-router', () => ({
  useLoaderData: () => ({ roomData, socket: mockSocket }),
}));

vi.mock('./roomCard/RoomCard', () => ({
  default: ({ room }: { room: RoomData }) => (
    <div data-testid={room.id}>{room.owner.id}</div>
  ),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('LobbyPage', () => {
  it('should rendered', () => {
    render(<LobbyPage />);

    expect(screen.getByText('userId1'));
    expect(screen.getByText('userId2'));
  });

  it('should set listener on socket event lobby:removed-room', () => {
    render(<LobbyPage />);

    expect(mockSocket.on).toHaveBeenCalledWith(
      'lobby:removed-room',
      expect.any(Function)
    );
  });

  it('should remove listener on lobby:removed-room when unmounting', () => {
    const { unmount } = render(<LobbyPage />);

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith(
      'lobby:removed-room',
      expect.any(Function)
    );
  });

  it('should remove room when call socket.on with lobby:removed-room', () => {
    render(<LobbyPage />);

    expect(screen.getByTestId('roomId1')).toBeInTheDocument();

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:removed-room'
    )?.[1];

    expect(callback).toBeDefined();
    act(() => {
      callback({ roomId: 'roomId1' });
    });
    expect(screen.queryByTestId('roomId1')).not.toBeInTheDocument();
  });

  it('should set listener on socket event lobby:created-room', () => {
    render(<LobbyPage />);

    expect(mockSocket.on).toHaveBeenCalledWith(
      'lobby:created-room',
      expect.any(Function)
    );
  });

  it('should create room when call socket.on with lobby:created-room', () => {
    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:created-room'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'newRoom',
          owner: {
            id: 'userId1',
            username: 'username1',
          },
        },
      });
    });

    expect(screen.queryByTestId('newRoom')).toBeInTheDocument();
  });

  it('should disables create button when the user owns a room', () => {
    render(<LobbyPage />);

    expect(screen.getByRole('room-create')).toBeDisabled();
  });
});
