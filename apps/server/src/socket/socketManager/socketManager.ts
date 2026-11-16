import { UserStatus } from '@repo/shared/socketEvents';
import { LobbyManager } from './lobbyManager.ts';
import RoomManager from './roomManager.ts';
import { RoomData } from '@repo/shared/room';

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
}
