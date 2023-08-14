import React from 'react';
import {Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addTask, changeFilter, getTodos} from '../../../../redux/toDoList';
import InputForm from '../InputForm/InputForm';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './TodoPage.module';
import {addTodoRequest} from '../../../../db/todoApi';
import {FILTER_OPTIONS} from '../../../../db/constants';
import TodoList from '../TodoList/TodoList';
import {FilterEnum} from '../../../../../types';

type Props = {
  navigation: any;
}

const TodoPage: React.FC <Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const activeTodos = useAppSelector(state => state.todoData.activeTasks);
  const currentPage = useAppSelector(state => state.todoData.currentPage);
  const filter = useAppSelector(state => state.todoData.filter);

  const addTodoOnSubmit = async (title: string) => {
    try {
      const titleTrim = title.trim();
      if (!titleTrim) {
        return;
      }

      const res = await addTodoRequest(titleTrim);
      if (!res) {
        return;
      }

      await dispatch(addTask(titleTrim));
      await getTodos({page: currentPage, filter});
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <SafeAreaView style={styles.page}>
      <InputForm onClickSave={addTodoOnSubmit} />
      <Text style={styles.text}>Active Todos: {activeTodos}</Text>
      <View style={styles.selectSection}>
        <Text style={styles.text}>Filter: </Text>
        <SelectDropdown
          buttonStyle={styles.selectButton}
          defaultValue={FilterEnum.all}
          data={FILTER_OPTIONS}
          buttonTextStyle={styles.fontFamilyMontserrat}
          rowTextStyle={styles.fontFamilyMontserratRegular}
          onSelect={selectedItem => {
            dispatch(changeFilter(selectedItem));
          }}
        />
      </View>
      <TodoList navigation={navigation}/>
    </SafeAreaView>
  );
};

export default TodoPage;
