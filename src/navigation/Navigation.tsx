import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/hooks';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import HeaderTitle from '../pages/header/components/HeaderTitle';
import HeaderButtons from '../pages/header/components/HeaderButtons';
import TodoIdPage from '../pages/todo/components/TodoIdPage';
import TodoPage from '../pages/todolist/components/TodoPage/TodoPage';
import LoginPage from '../pages/login/components/LoginPage';
import SignIn from '../pages/auth/SignIn/SignIn';
import SignUp from '../pages/auth/SignUp/SignUp';
import * as nativeStack from '@react-navigation/native-stack';

const Stack = nativeStack.createNativeStackNavigator();

const Navigation: React.FC = () => {
  const user = useAppSelector(state => state.userData);

  useEffect(() => {
    console.log('nav', user.email);
  }, [user.email]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Root'>
        {user.email && (
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
        )}

        <Stack.Screen
          name="SignIn"
          options={{headerShown: false}}
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        {/* {user.email ? <AppStack /> : <AuthStack />} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
