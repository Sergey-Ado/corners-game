import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RoomCard from './RoomCard';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';

const mockEmit = vi.fn();
const mockOn = vi.fn();
const mockOff = vi.fn();
const socket: Partial<TypedSocket> = {
  emit: mockEmit,
  on: mockOn,
  off: mockOff,
};

const room: RoomData = {
  id: 'roomId',
  owner: {
    id: 'userId',
    username: 'username',
  },
  guest: null,
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

    const joinButton = await screen.findByRole('room-join');

    fireEvent.click(joinButton);

    expect(mockEmit).toHaveBeenCalledWith('lobby:ask-joining', {
      roomId: 'roomId',
    });
  });

  it('should call console.log with "join" if click join button', async () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const joinButton = await screen.findByRole('room-delete');

    fireEvent.click(joinButton);

    expect(mockEmit).toHaveBeenCalledWith('lobby:remove-room', {
      roomId: 'roomId',
    });
  });

  it('should set disabled for deleteButton if call socket.on with lobby:wait-joining and user is owner', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callback = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId',
          owner: { id: 'userId', username: 'username' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).toBeDisabled();
  });

  it('should set disabled for deleteButton if call socket.on with lobby:wait-joining and user is guest', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callback = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId', username: 'username' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).toBeDisabled();
  });

  it('should not set disabled for deleteButton if call socket.on with lobby:wait-joining and user is not owner or guest', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callback = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    expect(callback).toBeDefined();

    act(() => {
      callback({
        room: {
          id: 'roomId',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).not.toBeDisabled();
  });

  it('should remove disabled of deleteButton if call socket.on with lobby:canceled-joining and user is owner', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callbackWait = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    act(() => {
      callbackWait({
        room: {
          id: 'roomId',
          owner: { id: 'userId', username: 'username' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const callbackCancel = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    act(() => {
      callbackCancel({
        room: {
          id: 'roomId',
          owner: { id: 'userId', username: 'username' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).not.toBeDisabled();
  });

  it('should remove disabled of deleteButton if call socket.on with lobby:canceled-joining and user is guest', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callbackWait = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    act(() => {
      callbackWait({
        room: {
          id: 'roomId',
          owner: { id: 'userId', username: 'username' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const callbackCancel = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    act(() => {
      callbackCancel({
        room: {
          id: 'roomId',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId', username: 'username' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).not.toBeDisabled();
  });

  it('should not remove disabled of deleteButton if call socket.on with lobby:canceled-joining and user is not owner or guest', () => {
    render(<RoomCard room={room} socket={socket as TypedSocket} />);

    const callbackWait = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:wait-joining'
    )?.[1];

    act(() => {
      callbackWait({
        room: {
          id: 'roomId',
          owner: { id: 'userId', username: 'username' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const callbackCancel = (socket.on as any).mock.calls.find(
      (call: any[]) => call[0] === 'lobby:canceled-joining'
    )?.[1];

    act(() => {
      callbackCancel({
        room: {
          id: 'roomId',
          owner: { id: 'userId1', username: 'username1' },
          guest: { id: 'userId2', username: 'username2' },
        },
      });
    });

    const deleteButton = screen.getByRole('room-delete');

    expect(deleteButton).toBeDisabled();
  });
});
