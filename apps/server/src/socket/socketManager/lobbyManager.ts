import { Player } from '@repo/shared/user';

export class LobbyManager {
  private players: Player[] = [];

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayerIds(): string[] {
    return this.players.map(player => player.id);
  }

  public removePlayers(players: Player[]): string[] {
    // eslint-disable-next-line unicorn/prefer-set-has
    const removedPlayerId = players.map(player => player.id);

    this.players = this.players.filter(
      player => !removedPlayerId.includes(player.id)
    );

    return this.getPlayerIds();
  }

  public inLobby(userId: string): boolean {
    return this.players.some(player => player.id === userId);
  }
}
