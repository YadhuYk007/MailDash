import {configureStore} from '@reduxjs/toolkit';
import userConfigSlice from './configSlice';

export const store = configureStore({
  reducer: {
    config: userConfigSlice,
  },
});
