import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './Header.module';

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({title}: Props) => {
  return (
    <View style={styles.titleSection}>
      <Image
        source={require('../../../../assets/img/logo.png')}
        style={styles.imageHeader}
      />
      <Text style={styles.fontFamilyMontserrat}> Fusion {title}</Text>
    </View>
  );
};

export default HeaderTitle;
