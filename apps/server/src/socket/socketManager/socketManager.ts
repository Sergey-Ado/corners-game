import { UserStatus } from '@repo/shared/socketEvents';
import { LobbyManager } from './lobbyManager.ts';
import RoomManager from './roomManager.ts';
import { RoomData } from '@repo/shared/room';
import { Player } from '@repo/shared/user';

export class SocketManager {
  private lobbyManager = new LobbyManager();
  private roomManager = new RoomManager();

  public getUserStatus(): UserStatus {
    return UserStatus.IN_LOBBY;
  }

  public initial(mockRooms: RoomData[]): void {
    this.roomManager.setRooms(mockRooms);
    for (const room of mockRooms) {
      this.lobbyManager.addPlayer(room.owner);
    }
  }

  public getRoomData(): RoomData[] {
    return this.roomManager.getRoomData();
  }

  public removeRoom(roomId: string):
    | {
        lobbyPlayerIds: string[];
      }
    | undefined {
    const lobbyPlayerIds = this.lobbyManager.getPlayerIds();

    if (this.roomManager.removeRoomById(roomId)) {
      return { lobbyPlayerIds };
    }
  }

  public createRoom(
    player: Player
  ): { room: RoomData; lobbyPlayerIds: string[] } | undefined {
    const { id: userId, username } = player;

    const lobbyPlayerIds = this.lobbyManager.getPlayerIds();

    if (!lobbyPlayerIds.includes(userId) || this.roomManager.hasRoom(userId))
      return;

    const room = this.roomManager.addRoom(userId, username);

    return { room, lobbyPlayerIds };
  }

  public waitJoining(
    roomId: string,
    guest: Player
  ): { room: RoomData; lobbyPlayerIds: string[] } | undefined {
    const room = this.roomManager.addGuest(roomId, guest);

    if (!room) return;

    const lobbyPlayerIds = this.lobbyManager.getPlayerIds();

    return { room, lobbyPlayerIds };
  }
}
