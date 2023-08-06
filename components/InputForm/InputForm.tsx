import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ButtonSolid} from 'react-native-ui-buttons';

interface Props {
  onClickSave: (title: string) => void;
}

const InputForm = (props: Props) => {
  const [title, setTitle] = useState('');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 10,
      alignContent: 'center',
      textAlign: 'center',
    },
    input: {
      width: '70%',
      backgroundColor: 'lavenderblush',
      color: 'black',
      textAlign: 'center',
      fontFamily: 'Montserrat',
    },
  });

  const saveTaskTitle = () => {
    props.onClickSave(title);
    setTitle('');
  };

  const changingTitle = (text: string) => {
    setTitle(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={changingTitle}
        value={title}
      />
      <ButtonSolid title="Add" onPress={saveTaskTitle} />
    </View>
  );
};

export default InputForm;
