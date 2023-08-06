import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {ToDoType} from '../../types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  changeStatusTask,
  changeTitleTask,
  removeTask,
} from '../../redux/toDoList';
import {useAppDispatch} from '../../redux/hooks';
import {ButtonSolid} from 'react-native-ui-buttons';

interface Props {
  todo: ToDoType;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignContent: 'center',
  },
  input: {
    flex: 0.9,
    backgroundColor: 'lavenderblush',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  title: {
    flex: 2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',

    color: 'white',
  },
  completed: {
    flex: 2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',

    color: 'black',
    // textDecorationLine: 'line-through',
  },
});

const Todo = (props: Props) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState(false);

  const deleteTodo = () => {
    dispatch(removeTask(props.todo.id));
  };

  const editTodo = () => {
    dispatch(changeStatusTask(props.todo.id));
  };

  const changeTodo = () => {
    setChange(true);
  };

  const titleTodo = (id: number, title: string) => {
    dispatch(changeTitleTask({id, title}));
    setChange(false);
  };

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        isChecked={props.todo.completed}
        onPress={editTodo}
        fillColor="hotpink"
      />
      {change ? (
        <TextInput
          autoFocus
          style={styles.input}
          defaultValue={props.todo.title}
          onBlur={() => setChange(false)}
          onSubmitEditing={(e) => {titleTodo(props.todo.id, e.nativeEvent.text)}}
        />
      ) : (
        <Text
          style={props.todo.completed ? styles.completed : styles.title}
          onLongPress={changeTodo}>
          {props.todo.title}
        </Text>
      )}
      <ButtonSolid title="Delete" onPress={deleteTodo} />
    </View>
  );
};

export default Todo;
