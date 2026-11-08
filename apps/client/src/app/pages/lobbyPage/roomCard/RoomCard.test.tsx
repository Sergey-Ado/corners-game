import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RoomCard from './RoomCard';
import { RoomData } from '../../../../../../../packages/shared/dist/types/room';

const room: RoomData = {
  id: 'roomId',
  ownerId: 'ownerId',
  ownerName: 'ownerName',
};

vi.mock('react-redux', () => ({
  useSelector: (fn: any) =>
    fn({
      general: {
        userdata: { id: 'ownerId', username: 'ownerName' },
      },
    }),
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe('RoomCard', () => {
  it('should rendered', () => {
    render(<RoomCard room={room} />);
  });

  it('should call console.log with "join" if click join button', async () => {
    vi.resetModules();
    vi.doMock('react-redux', () => ({
      useSelector: (fn: any) =>
        fn({
          general: {
            userdata: { id: 'userId', username: 'username' },
          },
        }),
    }));

    const RoomCard = await import('../roomCard/RoomCard');
    render(<RoomCard.default room={room} />);

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const joinButton = await screen.findByRole('room-join');

    fireEvent.click(joinButton);

    expect(spy).toHaveBeenCalledWith('join');
  });

  it('should call console.log with "join" if click join button', async () => {
    render(<RoomCard room={room} />);

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const joinButton = await screen.findByRole('room-delete');

    fireEvent.click(joinButton);

    expect(spy).toHaveBeenCalledWith('delete');
  });
});
