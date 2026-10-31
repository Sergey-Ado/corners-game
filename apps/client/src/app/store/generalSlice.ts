import { createSlice } from '@reduxjs/toolkit';
import { UserOutput } from '@repo/shared/user';

export const initialState = {
  isShowSettings: false,
  userdata: {
    id: '',
    username: '',
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    changeShowSettings(state, action: { payload: boolean; type: string }) {
      state.isShowSettings = action.payload;
    },
    changeUserdata(state, action: { payload: UserOutput; type: string }) {
      state.userdata = action.payload;
    },
  },
});

export const { changeShowSettings, changeUserdata } = generalSlice.actions;
export default generalSlice.reducer;
