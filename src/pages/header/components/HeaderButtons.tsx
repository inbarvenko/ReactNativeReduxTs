import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import styles from './Header.module';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {removeUser} from '../../../redux/userReducer';

interface Props {
  navigation: any;
}

const HeaderButtons: React.FC<Props> = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
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
        onPress={() => {
          dispatch(removeUser());
          navigation.navigate('SignIn')
        }}
        title="SignOut"
        color="#000"
      />
    </View>
  );
};

export default HeaderButtons;
