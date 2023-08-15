import React from 'react';
import * as nativeStack from '@react-navigation/native-stack';
import SignIn from '../pages/auth/SignIn/SignIn';
import SignUp from '../pages/auth/SignUp/SignUp';

const Stack = nativeStack.createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Group>
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
