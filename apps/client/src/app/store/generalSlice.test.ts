import { describe, expect, it } from 'vitest';
import generalReducer, {
  initialState,
  changeShowSettings,
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
});
