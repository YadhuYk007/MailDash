import {combineReducers} from 'redux';
import userConfigSlice from './configSlice';


const reducer = combineReducers({
  user: userConfigSlice
});

export const resetApp = () => {
  return {
    type: 'RESET',
  };
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;