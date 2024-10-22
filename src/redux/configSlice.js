import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appPassword: '',
  mailid: '',
  loggedIn: false,
};
const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.appPassword = action.payload;
    },
    setUserMail: (state, action) => {
      state.mailid = action.payload;
    },
    setLoginState: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const {setPassword, setUserMail, setLoginState} =
  userConfigSlice.actions;
export default userConfigSlice.reducer;
