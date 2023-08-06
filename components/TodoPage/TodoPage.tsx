import React from 'react';
import {Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Todo from '../Todo/Todo';
import {addTask} from '../../redux/toDoList';
import InputForm from '../InputForm/InputForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodoPage = () => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-evenly',
      marginTop: 10,
      alignContent: 'center',
    },
    list: {
      width:'80%',
      alignSelf: 'center',
    },
    page: {
      flex: 1,
      backgroundColor: 'pink',
    },
    text: {
      fontFamily: 'Montserrat',
      marginTop: 10,
      marginBottom: 20,
      fontSize: 20,
      alignSelf: 'center'
    },
    mainText: {
      fontFamily: 'Montserrat',
      marginTop: 20,
      marginBottom: 10,
      fontSize: 30,
      alignSelf: 'center'
    },
    descr: {
      fontFamily: 'Montserrat',
      marginTop: 10,
      marginBottom: 40,
      paddingHorizontal: 25,
      fontSize: 10,
      alignSelf: 'center',
      textAlign: 'center'
    },
  });

  const dispatch = useAppDispatch();
  const activeTodos = 5;
  const toDoList = useAppSelector(state => state.todoData.toDoList);

  const addTodo = (title: string) => {
    if (!title.trim()) return;

    dispatch(addTask(title));
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.mainText}>Todo list app</Text>
      <InputForm onClickSave={addTodo} />
      <Text style={styles.text}>Active Todos: {activeTodos}</Text>
      {toDoList.length ? (
        <FlatList
          style={styles.list}
          data={toDoList}
          renderItem={({item}) => <Todo todo={item} />}
        />
      ) : (
        <Text style={styles.descr}>No tasks</Text>
      )}
      {toDoList.length ? (
        <Text style={styles.descr}>
          To edit task use long press on chosen one. {'\n'}
          To save edit of task press OK.
        </Text>
      ) : null}
    </SafeAreaView>
  );
};

export default TodoPage;
