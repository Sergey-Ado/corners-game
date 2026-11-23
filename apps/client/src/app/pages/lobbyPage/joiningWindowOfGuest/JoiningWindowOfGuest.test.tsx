import { TypedSocket } from '@/types/general.types';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JoiningWindowOfGuest from './JoiningWindowOfGuest';

const mockEmit = vi.fn();
const socket: Partial<TypedSocket> = {
  emit: mockEmit,
};
const room = {
  id: 'roomId',
  owner: { id: 'user-1', username: 'username-1' },
  guest: { id: 'user-2', username: 'username-2' },
};

describe('JoiningWindowOfGuest', () => {
  it('should rendered', () => {
    render(<JoiningWindowOfGuest room={room} socket={socket as TypedSocket} />);
  });

  it('should call socket.emit when button click', () => {
    render(<JoiningWindowOfGuest room={room} socket={socket as TypedSocket} />);

    const button = screen.getByRole('no-button');

    fireEvent.click(button);

    expect(mockEmit).toHaveBeenCalledWith('lobby:cancel-joining');
  });
});
