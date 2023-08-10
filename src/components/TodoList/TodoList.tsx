import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  GestureResponderEvent,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Todo from '../Todo/Todo';
import {setCurrentPage} from '../../redux/toDoList';
import {getTodos} from '../../db/todoApi';
import {ButtonOutline} from 'react-native-ui-buttons';

const TodoList = () => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-evenly',
      marginTop: 10,
      alignContent: 'center',
    },
    list: {
      width: '80%',
      alignSelf: 'center',
    },
    descr: {
      fontFamily: 'Montserrat',
      marginTop: 10,
      marginBottom: 40,
      paddingHorizontal: 25,
      fontSize: 10,
      alignSelf: 'center',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      alignContent: 'center',
    },
    button: {
      width: '20%',
      marginHorizontal: 5,
    },
  });

  const dispatch = useAppDispatch();
  const toDoList = useAppSelector(state => state.todoData.toDoList);
  const pages = useAppSelector(state => state.todoData.pages);
  const currentPage = useAppSelector(state => state.todoData.currentPage);
  const activeTodos = useAppSelector((state) => state.todoData.activeTasks);
  const [del, setDel] =useState(false);

  if(toDoList.length < 1) { dispatch(setCurrentPage(1)) }

  useEffect(() => {
    dispatch(getTodos(currentPage));

  }, [currentPage, activeTodos, del]);

  const changeCurrentPage = (e: GestureResponderEvent, parametr: number) => {
    if (parametr !== currentPage) {
      dispatch(setCurrentPage(parametr));
    }
  };

  const change = () => {
    setDel(!del)
  }


  return (
    <View>
      {toDoList.length ? (
        <FlatList
          style={styles.list}
          windowSize={5}
          data={toDoList}
          renderItem={({item}) => <Todo delFun={change} todo={item} key={item.id} />}
        />
      ) : (
        <Text style={styles.descr}>No tasks</Text>
      )}
      <View style={styles.buttonContainer}>
        {pages.length > 1 &&
          pages.map(page => {
            return (
              <ButtonOutline
                title={page.toString()}
                onPress={e => changeCurrentPage(e, page)}
                style={styles.button}
                disabled={page == currentPage}
                key={page.toString()}
              />
            );
          })}
      </View>
      {toDoList.length ? (
        <Text style={styles.descr}>
          To edit task use long press on chosen one. {'\n'}
          To save edit of task press OK.
        </Text>
      ) : null}
    </View>
  );
};

export default TodoList;
