import { RoomData } from '@repo/shared/room';

const mockRooms: RoomData[] = [
  {
    id: 'roomId1',
    owner: {
      id: '9eb7d982-2d3d-40e9-a54e-1b0d90091e2c',
      username: 'User1',
    },
    guest: null,
  },
  {
    id: 'roomId2',
    owner: {
      id: 'bf31820c-f92c-469b-88b6-19874f7cafb4',
      username: 'User2',
    },
    guest: null,
  },
  {
    id: 'roomId3',
    owner: {
      id: '9decb28c-50eb-4ec3-b8e5-be251db6e7a2',
      username: 'User3',
    },
    guest: null,
  },
  {
    id: 'roomI4',
    owner: {
      id: 'c5938337-66ed-4dd7-90d0-3fdfd6cb43d1',
      username: 'User4',
    },
    guest: null,
  },
];

export default mockRooms;
