import React from 'react';
import Navigation from './navigation/navigation';
import {store} from './redux/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
