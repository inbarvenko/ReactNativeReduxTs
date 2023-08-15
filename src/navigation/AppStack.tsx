import React from 'react';
import * as nativeStack from '@react-navigation/native-stack';
import HeaderTitle from '../pages/header/components/HeaderTitle';
import HeaderButtons from '../pages/header/components/HeaderButtons';
import TodoIdPage from '../pages/todo/components/TodoIdPage';
import TodoPage from '../pages/todolist/components/TodoPage/TodoPage';
import LoginPage from '../pages/login/components/LoginPage';
import SignIn from '../pages/auth/SignIn/SignIn';


const Stack = nativeStack.createNativeStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Group>
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStack;
