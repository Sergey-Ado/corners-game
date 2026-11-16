import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RoomCard from './RoomCard';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';

const mockEmit = vi.fn();
const socket: Partial<TypedSocket> = {
  emit: mockEmit,
};

const room: RoomData = {
  id: 'roomId',
  owner: {
    id: 'userId',
    username: 'username',
  },
};

vi.mock('react-redux', () => ({
  useSelector: (fn: any) =>
    fn({
      general: {
        userdata: { id: 'userId', username: 'username' },
      },
    }),
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe('RoomCard', () => {
  it('should rendered', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);
  });

  it('should call console.log with "join" if click join button', async () => {
    vi.resetModules();
    vi.doMock('react-redux', () => ({
      useSelector: (fn: any) =>
        fn({
          general: {
            userdata: { id: 'userId2', username: 'username2' },
          },
        }),
    }));

    const RoomCard = await import('../roomCard/RoomCard');
    render(<RoomCard.default room={room} socket={socket as TypedSocket} />);

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const joinButton = await screen.findByRole('room-join');

    fireEvent.click(joinButton);

    expect(spy).toHaveBeenCalledWith('join');
  });

  it('should call console.log with "join" if click join button', async () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const joinButton = await screen.findByRole('room-delete');

    fireEvent.click(joinButton);

    expect(mockEmit).toHaveBeenCalledWith('lobby:remove-room', {
      roomId: 'roomId',
    });
  });
});
