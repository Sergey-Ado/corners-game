import { describe, expect, it } from 'vitest';
import generalReducer, {
  initialState,
  changeShowSettings,
  changeUserdata,
} from './generalSlice';

describe('generalSlice', () => {
  it('should switches isShowSettings to true and to false', () => {
    let action = changeShowSettings(true);
    let state = generalReducer(initialState, action);
    expect(state.isShowSettings).toBeTruthy();

    action = changeShowSettings(false);
    state = generalReducer(initialState, action);
    expect(state.isShowSettings).toBeFalsy();
  });

  it('should switcher userdata', () => {
    const userdata = { id: 'id', username: 'username' };
    const action = changeUserdata(userdata);
    const state = generalReducer(initialState, action);
    expect(state.userdata).toEqual(userdata);
  });
});
