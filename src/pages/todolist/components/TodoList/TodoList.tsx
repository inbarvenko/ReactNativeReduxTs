import React, {useEffect} from 'react';
import {
  Text,
  FlatList,
  GestureResponderEvent,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import Todo from '../Todo/Todo';
import {setCurrentPage} from '../../../../redux/toDoList';
import {getTodos} from '../../../../redux/toDoList';
import {ButtonOutline} from 'react-native-ui-buttons';
import styles from './TodoList.module';

type Props = {
  navigation: any;
}

const TodoList: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const {
    toDoList, 
    filter, 
    pages, 
    currentPage, 
    activeTasks
  } = useAppSelector(state => state.todoData);


  useEffect(() => {
    if(toDoList.length) {return;}
    if(currentPage === 1) {return;}

    dispatch(setCurrentPage(1));
  }, [toDoList.length]);

  useEffect(() => {
    try{
      dispatch(getTodos({page: currentPage, filter}));
    } catch(error) {console.log(error)}
  }, [currentPage, activeTasks, filter]);


  const changeCurrentPage = (e: GestureResponderEvent, parametr: number) => {
    if (parametr === currentPage) {return;}
    
    dispatch(setCurrentPage(parametr));
  };

  return (
    <View>
      {toDoList.length ? (
        <FlatList
          nestedScrollEnabled
          style={styles.list}
          data={(toDoList.length > 5) ? toDoList.slice(0, -1) : toDoList}
          renderItem={({item}) => (
            <Todo todo={item} key={item.id} navigation={props.navigation}/>
          )}
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
                disabled={page === currentPage}
                key={page.toString()}
              />
            );
          })}
      </View>
      {toDoList.length ? (
        <Text style={styles.descr}>
          To edit task use long press on chosen one. 
          To save edit of task press OK.
        </Text>
      ) : null}
    </View>
  );
};

export default TodoList;
