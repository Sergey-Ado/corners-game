import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LobbyPage from './LobbyPage';
import { RoomData, RoomState } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';
import { RootState } from '@/app/store/store';
import { useLoaderData } from 'react-router';

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

const roomState: RoomState = {
  roomData,
  waitRoom: null,
};

const mockSocket: Partial<TypedSocket> = {
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('react-redux', () => ({
  useSelector: (selector: (state: RootState) => string) =>
    selector({ general: { userdata: { id: 'userId1' } } } as RootState),
}));

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
  useNavigate: () => mockNavigate,
}));

vi.mock('./roomCard/RoomCard', () => ({
  default: ({ room }: { room: RoomData }) => (
    <div data-testid={room.id}>{room.owner.id}</div>
  ),
}));

const { mockToast } = vi.hoisted(() => ({
  mockToast: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: mockToast,
}));

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(useLoaderData).mockReturnValue({
    roomState,
    socket: mockSocket,
  });
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

  it('should render JoiningWindowOfOwner if LobbyPage rendered and userId is owner of room with waiting', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId1', username: 'username1' },
        guest: { id: 'userId2', username: 'username2' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const joiningWindow = screen.getByRole('joining-window-of-owner');

    expect(joiningWindow).toBeInTheDocument();
  });

  it('should render JoiningWindowOfGuest if LobbyPage rendered and userId is guest of room with waiting', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId2', username: 'username2' },
        guest: { id: 'userId1', username: 'username1' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const joiningWindow = screen.getByRole('joining-window-of-guest');

    expect(joiningWindow).toBeInTheDocument();
  });

  it('should render JoiningWindowOfOwner when call socket.on with lobby:wait-joining and user is owner of room with waiting', () => {
    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const joiningWindowOfOwner = screen.getByRole('joining-window-of-owner');
    const joiningWindowOfGuest = screen.queryByRole('joining-window-of-guest');

    expect(joiningWindowOfOwner).toBeInTheDocument();
    expect(joiningWindowOfGuest).not.toBeInTheDocument();
  });

  it('should render JoiningWindowOfOwner when call socket.on with lobby:wait-joining and user is guest of room with waiting', () => {
    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId2', username: 'username2' },
          guest: { id: 'userId1', username: 'username1' },
        },
      });
    });

    const joiningWindowOfOwner = screen.queryByRole('joining-window-of-owner');
    const joiningWindowOfGuest = screen.getByRole('joining-window-of-guest');

    expect(joiningWindowOfOwner).not.toBeInTheDocument();
    expect(joiningWindowOfGuest).toBeInTheDocument();
  });

  it('should remove JoiningWindowOfOwner and call toast when call socket.on with lobby:canceled-joining and user is owner of room with waiting and not initiator', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId1', username: 'username1' },
        guest: { id: 'userId2', username: 'username2' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId2', username: 'username2' },
        },
        initiator: { id: 'userId2', username: 'username2' },
      });
    });

    const joiningWindowOfOwner = screen.queryByRole('joining-window-of-owner');

    expect(joiningWindowOfOwner).not.toBeInTheDocument();
    expect(mockToast).toHaveBeenCalled();
  });

  it('should remove JoiningWindowOfOwner and not call toast when call socket.on with lobby:canceled-joining and user is owner of room with waiting and initiator', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId1', username: 'username1' },
        guest: { id: 'userId2', username: 'username2' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId2', username: 'username2' },
        },
        initiator: { id: 'userId1', username: 'username1' },
      });
    });

    const joiningWindowOfOwner = screen.queryByRole('joining-window-of-owner');

    expect(joiningWindowOfOwner).not.toBeInTheDocument();
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('should remove JoiningWindowOfGuest and call toast when call socket.on with lobby:canceled-joining and user is guest of room with waiting and not initiator', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId2', username: 'username2' },
        guest: { id: 'userId1', username: 'username1' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId2', username: 'username2' },
          guest: { id: 'userId1', username: 'username1' },
        },
        initiator: { id: 'userId2', username: 'username2' },
      });
    });

    const joiningWindowOfGuest = screen.queryByRole('joining-window-of-guest');

    expect(joiningWindowOfGuest).not.toBeInTheDocument();
    expect(mockToast).toHaveBeenCalled();
  });

  it('should remove JoiningWindowOfGuest and not call toast when call socket.on with lobby:canceled-joining and user is guest of room with waiting and initiator', () => {
    const roomState: RoomState = {
      roomData,
      waitRoom: {
        id: 'roomId1',
        owner: { id: 'userId2', username: 'username2' },
        guest: { id: 'userId1', username: 'username1' },
      },
    };

    vi.mocked(useLoaderData).mockReturnValue({
      roomState,
      socket: mockSocket,
    });

    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId1',
          owner: { id: 'userId2', username: 'username2' },
          guest: { id: 'userId1', username: 'username1' },
        },
        initiator: { id: 'userId1', username: 'username2' },
      });
    });

    const joiningWindowOfGuest = screen.queryByRole('joining-window-of-guest');

    expect(joiningWindowOfGuest).not.toBeInTheDocument();
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('should call navigate to game page when call socket.on with game:started-game', () => {
    // const roomState: RoomState = {
    //   roomData,
    //   waitRoom: {
    //     id: 'roomId1',
    //     owner: { id: 'userId1', username: 'username1' },
    //     guest: { id: 'userId2', username: 'username2' },
    //   },
    // };

    // vi.mocked(useLoaderData).mockReturnValue({
    //   roomState,
    //   socket: mockSocket,
    // });

    render(<LobbyPage />);

    const callback = (mockSocket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'game:started-game'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback();
    });

    expect(mockNavigate).toHaveBeenCalled();
  });
});
