import React from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import Navigation from './navigation/Navigation';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export default App;
