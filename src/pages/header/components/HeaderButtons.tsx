import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import styles from './Header.module';

interface Props {
  navigation: any;
}

const HeaderButtons: React.FC <Props>= ({navigation}: Props) => {
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
    </View>
  );
};

export default HeaderButtons;
