import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isShowSettings: true,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    changeShowSettings(state, action: { payload: boolean; type: string }) {
      state.isShowSettings = action.payload;
    },
  },
});

export const { changeShowSettings } = generalSlice.actions;
export default generalSlice.reducer;
