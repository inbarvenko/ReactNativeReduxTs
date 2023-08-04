import React from 'react';
import {Button, Text, View} from 'react-native';
import {ToDoType} from '../../types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { changeStatusTask, removeTask } from '../../redux/toDoList';
import { useAppDispatch } from '../../redux/hooks';

interface Props {
  todo: ToDoType;
}

const Todo = (props: Props) => {
  
  const dispatch = useAppDispatch();

  const deleteTodo = () => {
    dispatch(removeTask(props.todo.id));
  }

  const editTodo = () => {
    dispatch(changeStatusTask(props.todo.id))
  }

  return (
    <View>
      <BouncyCheckbox
        style={{marginTop: 16}}
        isChecked={props.todo.completed}
        text="Synthetic Checkbox"
        disableBuiltInState
        onPress={() => editTodo}
      />
      <Text>{props.todo.title}</Text>
      <Button
        title="Delete"
        onPress={deleteTodo}
      />
    </View>
  );
};

export default Todo;
