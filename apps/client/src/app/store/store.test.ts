import { describe, expect, it } from 'vitest';
import store from './store';
import { initialState } from './generalSlice';

describe('Redux store', () => {
  it('should created with correct initial state', () => {
    const state = store.getState();

    expect(state.general).toEqual(initialState);
  });
});
