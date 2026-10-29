import { describe, expect, it } from 'vitest';
import getUserWithoutPassword from '../../utils/getUserWithoutPassword.ts';

describe('getUserWithoutPassword', () => {
  it('should return user without password', () => {
    const testUser = {
      id: 'id1',
      email: 'test@mail.ru',
      username: 'John Doe',
      password: 'password',
    };

    const output = getUserWithoutPassword(testUser);

    expect(output).toHaveProperty('id');
    expect(output).toHaveProperty('email');
    expect(output).toHaveProperty('username');
    expect(output).not.toHaveProperty('password');
  });
});
