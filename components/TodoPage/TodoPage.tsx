import React, {useEffect} from 'react';
import {
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  GestureResponderEvent,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Todo from '../Todo/Todo';
import {addTask, setCurrentPage} from '../../redux/toDoList';
import InputForm from '../InputForm/InputForm';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTodos} from '../../db/todoApi';
import {ButtonOutline, ButtonSolid} from 'react-native-ui-buttons';
import TodoList from '../TodoList/TodoList';

const TodoPage = () => {
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: 'pink',
    },
    text: {
      fontFamily: 'Montserrat',
      marginTop: 10,
      marginBottom: 20,
      fontSize: 20,
      alignSelf: 'center',
    },
    mainText: {
      fontFamily: 'Montserrat',
      marginTop: 20,
      marginBottom: 10,
      fontSize: 30,
      alignSelf: 'center',
    },
  });

  const dispatch = useAppDispatch();
  const activeTodos = useAppSelector((state) => state.todoData.activeTasks);

  const addTodo = (title: string) => {
    if (!title.trim()) return;

    dispatch(addTask(title));
  };

  // useEffect(() => {

  // }, [activeTodos])

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.mainText}>Todo list app</Text>
      <InputForm onClickSave={addTodo} />
      <Text style={styles.text}>Active Todos: {activeTodos}</Text>
      <TodoList/>
    </SafeAreaView>
  );
};

export default TodoPage;
