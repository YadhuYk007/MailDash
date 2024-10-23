import React from 'react';
import Navigation from './navigation/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {Persistor} from './redux/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Navigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
