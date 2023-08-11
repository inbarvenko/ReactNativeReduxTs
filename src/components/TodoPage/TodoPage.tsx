import React from 'react';
import {Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addTask, getTodos} from '../../redux/toDoList';
import InputForm from '../InputForm/InputForm';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoList from '../TodoList/TodoList';
import styles from './TodoPage.module';
import { addTodoRequest } from '../../db/todoApi';

const TodoPage: React.FC  = () => {
  const dispatch = useAppDispatch();
  const activeTodos = useAppSelector(state => state.todoData.activeTasks);
  const currentPage = useAppSelector(state => state.todoData.currentPage);


  const addTodoOnSubmit = async (title: string) => {
    const titleTrim = title.trim();
    if (!titleTrim) {return;}
    
    const res = await addTodoRequest(titleTrim);
    if (!res) {return;}

    await dispatch(addTask(titleTrim));
    await getTodos(currentPage);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.mainText}>Todo list app</Text>
      <InputForm onClickSave={addTodoOnSubmit} />
      <Text style={styles.text}>Active Todos: {activeTodos}</Text>
      <TodoList />
    </SafeAreaView>
  );
};

export default TodoPage;
