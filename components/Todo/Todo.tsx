import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ToDoType} from '../../types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { changeStatusTask, removeTask } from '../../redux/toDoList';
import { useAppDispatch } from '../../redux/hooks';
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
  title: {
    flex:2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',
  },
  completed: {
    flex:2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  }
});

const Todo = (props: Props) => {

  const dispatch = useAppDispatch();

  const deleteTodo = () => {
    dispatch(removeTask(props.todo.id));
  }

  const editTodo = () => {
    dispatch(changeStatusTask(props.todo.id))
  }

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        isChecked={props.todo.completed}
        onPress={() => editTodo}
        fillColor='hotpink'
      />
      <Text style={props.todo.completed ? styles.completed : styles.title}>{props.todo.title}</Text>
      <ButtonSolid
        title="Delete"
        onPress={deleteTodo}
      />
    </View>
  );
};

export default Todo;
