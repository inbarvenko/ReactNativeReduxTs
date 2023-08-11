import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {ButtonOutline} from 'react-native-ui-buttons';
import styles from './InputForm.module';

interface Props {
  onClickSave: (title: string) => void;
}

const InputForm: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState('');

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
      <ButtonOutline 
        title="Add" 
        onPress={saveTaskTitle} 
      />
    </View>
  );
};

export default InputForm;
