import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TodoPage from './components/TodoPage/TodoPage';


function App(): JSX.Element {

  return (
    <NavigationContainer>
      <TodoPage/>
    </NavigationContainer>
  );
}

export default App;
