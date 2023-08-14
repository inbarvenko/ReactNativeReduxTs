import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TodoPage from './src/pages/todolist/components/TodoPage/TodoPage';
import LoginPage from './src/pages/login/components/LoginPage';
import store from './src/redux/store';
import {Provider} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderTitle from './src/pages/header/components/HeaderTitle';
import HeaderButtons from './src/pages/header/components/HeaderButtons';
import TodoIdPage from './src/pages/todo/components/TodoIdPage';

const Stack = createNativeStackNavigator();
type Params = {
  navigation: any;
  title: string;
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={LoginPage}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: 'lightblue',
              },
              headerBackVisible: false,
              headerTitle: () => <HeaderTitle title={'main page'} />,
              headerRight: () => <HeaderButtons navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Todos"
            component={TodoPage}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: 'lightblue',
              },
              headerBackVisible: false,
              headerTitle: () => <HeaderTitle title={'todos'} />,
              headerRight: () => <HeaderButtons navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Todo"
            component={TodoIdPage}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: 'lightblue',
              },
              headerBackVisible: false,
              headerTitle: () => <HeaderTitle title={'todos'} />,
              headerRight: () => <HeaderButtons navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
