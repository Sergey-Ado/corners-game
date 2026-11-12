import { describe, expect, it } from 'vitest';
import Room from '../../../src/socket/socketManager/room.ts';

describe('Room', () => {
  it('should return room data using getData method', () => {
    const input = { ownerId: 'owner-1', ownerName: 'Owner' };

    const room = new Room(input);

    const data = room.getData();

    expect(data).toEqual({
      id: expect.any(String),
      ownerId: 'owner-1',
      ownerName: 'Owner',
    });
  });

  it('should change id using setId method', () => {
    const input = { ownerId: 'owner-1', ownerName: 'Owner' };

    const room = new Room(input);

    expect(room['id']).not.toBe('id-1');

    room.setId('id-1');

    expect(room['id']).toBe('id-1');
  });
});
