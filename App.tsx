import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TodoPage from './src/components/TodoPage/TodoPage';
import store from './src/redux/store';
import { Provider } from 'react-redux';


function App(): JSX.Element {

  return (
    // <NavigationContainer>
    <Provider store={store}>
      <TodoPage/>
    </Provider>
    // </NavigationContainer>
  );
}

export default App;
