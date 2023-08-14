import styles from './TodoId.module';
import React, { useEffect } from 'react';
import {ScrollView, Text} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getTodoId, removeTask } from '../../../redux/toDoList';
import { ButtonSolid } from 'react-native-ui-buttons';
import { deleteTodoRequest } from '../../../db/todoApi';


type Props = {
    route: any;
    navigation: any;
}

const TodoIdPage: React.FC <Props> = ({route, navigation}) => {

  const id = route.params;
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todoData.todo)
  if (!todo) {navigation.navigate('Todos')}

  useEffect(() => {
    dispatch(getTodoId(id));
  }, [])

  const deleteTodo = async () => {
    try{
      const res = await deleteTodoRequest(id);
      if(!res) {return;}

      await dispatch(removeTask(id));
      await navigation.navigate('Todos');
    } catch(error) {console.log(error)}
  };

  
  return (
    <ScrollView style={styles.textArea}>
        <Text style={styles.fontFamilyMontserratRegular}>Todo ID: {id}</Text> 
        <Text style={styles.fontFamilyMontserratRegular}>Todo title: {todo?.title}</Text>
        <Text style={styles.fontFamilyMontserratRegular}>Todo was created: {todo?.created_at}</Text>
        <ButtonSolid style={styles.buttonSection} title="Delete" onPress={deleteTodo} />
    </ScrollView>
    );
};

export default TodoIdPage;
