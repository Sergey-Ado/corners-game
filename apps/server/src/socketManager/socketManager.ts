import { UserStatus } from '@repo/shared/socketEvents';

export class SocketManager {
  public getUserStatus(): UserStatus {
    return UserStatus.IN_LOBBY;
  }
}
