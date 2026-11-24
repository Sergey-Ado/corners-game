import { Player } from '@repo/shared/user';

export default class Game {
  public owner: Player;
  public guest: Player;

  public constructor({ owner, guest }: { owner: Player; guest: Player }) {
    this.owner = owner;
    this.guest = guest;
  }
}
