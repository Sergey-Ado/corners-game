import { RoomData } from '@repo/shared/roomData';
import mockRooms from '../mockData/mockRooms';

const loader = () => {
  return new Promise<RoomData[]>(res => {
    const roomData = mockRooms;

    res(roomData);
  });
};

export default function getRouterLoaders() {
  const roomLoader = loader;

  return { roomLoader };
}
