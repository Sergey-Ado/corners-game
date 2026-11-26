import { describe, expect, it } from 'vitest';
import { LobbyManager } from '../../../src/socket/socketManager/lobbyManager';

describe('lobbyManager', () => {
  it('should add player using addPlayer method', () => {
    const lobbyManager = new LobbyManager();
    const player = { id: 'userId', username: 'username' };

    expect(lobbyManager['players']).toEqual([]);

    lobbyManager.addPlayer(player);

    expect(lobbyManager['players']).toEqual([player]);
  });

  it('should return player ids using getPlayerIds method', () => {
    const lobbyManager = new LobbyManager();
    const player = { id: 'userId', username: 'username' };
    lobbyManager['players'] = [player];

    const playerIds = lobbyManager.getPlayerIds();

    expect(playerIds).toEqual(['userId']);
  });

  it('should remove players from lobby', () => {
    const players = [
      { id: 'user-1', username: 'username-1' },
      { id: 'user-2', username: 'username-2' },
    ];

    const lobbyManager = new LobbyManager();
    lobbyManager['players'] = players;

    const result = lobbyManager.removePlayers(players);

    expect(result).toEqual([]);
  });
});
