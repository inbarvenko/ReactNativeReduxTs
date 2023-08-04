import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

interface Props {
  onClickSave: (title: string) => void;
}

const InputForm = (props: Props) => {
  const [title, setTitle] = useState('');

  const saveTaskTitle = () => {
    props.onClickSave(title);
    setTitle('');
  };

  const changingTitle = (text: string) => {
    setTitle(text);
  };

  const returnValue = () => {
    props.onClickSave('');
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Todo title"
        onChangeText={changingTitle}
        onBlur={returnValue}
      />
      <Button title="Add" onPress={saveTaskTitle} />
    </View>
  );
};

export default InputForm;
