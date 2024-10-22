import React from 'react';
import Navigation from './navigation/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {Persistor} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
