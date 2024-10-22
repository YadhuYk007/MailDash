import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appPassword: '',
};
const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setAppPassword: (state, action) => {
      state.appPassword = action.payload;
    },
  },
});

export const {setAppPassword} = userConfigSlice.actions;
export default userConfigSlice.reducer;
