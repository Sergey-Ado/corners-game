import { Player } from '@repo/shared/user';

export class LobbyManager {
  private players: Player[] = [];

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayerIds(): string[] {
    return this.players.map(player => player.id);
  }
}
