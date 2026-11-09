import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LobbyPage from './LobbyPage';
import { RoomData } from '@repo/shared/room';

const roomData: RoomData[] = [
  { id: 'roomId1', ownerId: 'ownerId1', ownerName: 'ownerName1' },
];

vi.mock('react-redux', () => ({
  useSelector: () => vi.fn(),
}));

vi.mock('react-router', () => ({
  useLoaderData: () => ({ roomData }),
}));

vi.mock('./roomCard/RoomCard', () => ({
  default: ({ room }: { room: RoomData }) => <div>{room.id}</div>,
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

    expect(screen.getByText('roomId1'));
  });
});
