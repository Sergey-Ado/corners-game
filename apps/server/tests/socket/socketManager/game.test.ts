import { describe, expect, it } from 'vitest';
import Game from '../../../src/socket/socketManager/game';

describe('Game', () => {
  it('should remember owner and guest', () => {
    const owner = { id: 'user-1', username: 'username-1' };
    const guest = { id: 'user-2', username: 'username-2' };

    const game = new Game({ owner, guest });

    expect(game.owner).toEqual(owner);
    expect(game.guest).toEqual(guest);
  });
});
