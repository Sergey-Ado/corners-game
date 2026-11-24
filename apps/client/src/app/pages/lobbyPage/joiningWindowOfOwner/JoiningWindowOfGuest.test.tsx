import { TypedSocket } from '@/types/general.types';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JoiningWindowOfOwner from './JoiningWindowOfOwner';

const mockEmit = vi.fn();
const socket: Partial<TypedSocket> = {
  emit: mockEmit,
};
const room = {
  id: 'roomId',
  owner: { id: 'user-1', username: 'username-1' },
  guest: { id: 'user-2', username: 'username-2' },
};

describe('JoiningWindowOfOwner', () => {
  it('should rendered', () => {
    render(<JoiningWindowOfOwner room={room} socket={socket as TypedSocket} />);
  });

  it('should call socket.emit when no-button click', () => {
    render(<JoiningWindowOfOwner room={room} socket={socket as TypedSocket} />);

    const button = screen.getByRole('no-button');

    fireEvent.click(button);

    expect(mockEmit).toHaveBeenCalledWith('lobby:cancel-joining');
  });

  it('should show anonymous if guest in not exist', () => {
    render(
      <JoiningWindowOfOwner
        room={{ ...room, guest: null }}
        socket={socket as TypedSocket}
      />
    );

    const span = screen.getByText('anonymous');

    expect(span).toBeInTheDocument();
  });

  it('should call socket.emit with lobby:ok-joining when yes-button click', () => {
    render(<JoiningWindowOfOwner room={room} socket={socket as TypedSocket} />);

    const button = screen.getByRole('yes-button');

    fireEvent.click(button);

    expect(mockEmit).toHaveBeenCalledWith('lobby:ok-joining');
  });
});
