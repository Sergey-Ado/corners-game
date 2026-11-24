import { describe, expect, it } from 'vitest';
import GameManager from '../../../src/socket/socketManager/gameManager';

describe('GameManager', () => {
  it('should create new game and return ids of players with addGame method', () => {
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };

    const gameManager = new GameManager();

    const result = gameManager.addGame(room);

    expect(result).toEqual(['user-1', 'user-2']);
  });

  it('should return undefined if guest is not exist in room', () => {
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };

    const gameManager = new GameManager();

    const result = gameManager.addGame(room);

    expect(result).toBeUndefined();
  });

  it('should return true if user is owner in any game', () => {
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };

    const gameManager = new GameManager();
    gameManager.addGame(room);

    const result = gameManager.hasPlayer('user-1');

    expect(result).toBeTruthy();
  });

  it('should return true if user is guest in any game', () => {
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };

    const gameManager = new GameManager();
    gameManager.addGame(room);

    const result = gameManager.hasPlayer('user-2');

    expect(result).toBeTruthy();
  });
});
