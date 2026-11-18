import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CreateRoomButton from './CreateRoomButton';
import { TypedSocket } from '@/types/general.types';

const mockEmit = vi.fn();
const socket: Partial<TypedSocket> = {
  emit: mockEmit,
};

describe('CreateRoomButton', () => {
  it('should call socket.emit when button click', () => {
    render(
      <CreateRoomButton socket={socket as TypedSocket} disabled={false} />
    );

    const button = screen.getByRole('room-create');

    fireEvent.click(button);

    expect(mockEmit).toHaveBeenCalledWith('lobby:create-room');
  });
});
