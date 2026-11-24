import { RoomData } from '@repo/shared/room';
import Game from './game.ts';

export default class GameManager {
  private games: Game[] = [];

  public addGame(room: RoomData): string[] | undefined {
    if (!room.guest) return;

    const { owner, guest } = room;

    this.games.push(new Game({ owner, guest }));

    return [owner.id, guest.id];
  }

  public hasPlayer(userId: string): boolean {
    return this.games.some(
      game => game.owner.id === userId || game.guest.id === userId
    );
  }
}
