import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import styles from './Header.module';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {removeUser} from '../../../redux/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const HeaderButtons: React.FC<Props> = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const removeUserData = async () => {
    await dispatch(removeUser());
    await AsyncStorage.removeItem('user');
    console.log('removeUser')

    await navigation.navigate('SignIn');
  };

  return (
    <View style={styles.buttonSection}>
      <Button
        onPress={() => navigation.navigate('Todos')}
        title="Todos"
        color="#000"
      />
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Home"
        color="#000"
      />
      <Button
        onPress={removeUserData}
        title="SignOut"
        color="#000"
      />
    </View>
  );
};

export default HeaderButtons;
