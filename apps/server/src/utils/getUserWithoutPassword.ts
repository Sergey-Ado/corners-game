import { User } from '@repo/shared/user';

export default function getUserWithoutPassword(
  user: User
): Omit<User, 'password'> {
  const { id, email, username } = user;

  return { id, email, username };
}
