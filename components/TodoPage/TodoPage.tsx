import React from 'react';
import {Text, ScrollView, TextInput, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Todo from '../Todo/Todo';
import { addTask } from '../../redux/toDoList';
import InputForm from '../InputForm/InputForm';


const TodoPage = () => {

  const dispatch = useAppDispatch()
  const activeTodos = 5;
  const toDoList = useAppSelector(state => state.todoData.toDoList);


  const addTodo = (title: string) => {
    if (!title.trim()) return;

    dispatch(addTask(title));
  }

  return (
    <ScrollView>
      <Text>Todo list app</Text>
      <InputForm
        onClickSave={addTodo}
      />
      <Text>Active Todos: {activeTodos}</Text>
      {toDoList.length ?
        <FlatList 
        data={toDoList} 
        renderItem={({item}) => <Todo todo={item}/>}
        />
        : <Text>No tasks</Text>
      } 
      {toDoList.length
        ? <Text>
            To edit task use doubleclick on chosen one. 
            To save edit of task press Enter, to cancel push mouse somewhere else.
          </Text>
        : null}
    </ScrollView>
  );
};

export default TodoPage;
