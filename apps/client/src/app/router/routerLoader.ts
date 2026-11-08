import { RoomData } from '@repo/shared/roomData';
import mockRooms from '../mockData/mockRooms';

const loader = async () => {
  const roomData = await Promise.resolve<RoomData[]>(mockRooms);

  return { roomData };
};

export default function getPageLoaders() {
  const roomLoader = loader;

  return { roomLoader };
}
