import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {ToDoType} from '../../../types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  toggleCompleted,
  changeTitleTask,
  removeTask,
} from '../../redux/toDoList';
import {useAppDispatch} from '../../redux/hooks';
import {ButtonSolid} from 'react-native-ui-buttons';
import styles from './Todo.module';
import { changeTitleRequest, deleteTodoRequest, toggleCompletedRequest } from '../../db/todoApi';

interface Props {
  todo: ToDoType;
}

const Todo: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const [changeTitle, setChangeTitle] = useState(false);

  const deleteTodo = async () => {
    const res = await deleteTodoRequest(props.todo.id);
    if(!res) {return;}

    await dispatch(removeTask(props.todo.id));
  };

  const onToggleCompleted = async () => {
    const res = await toggleCompletedRequest(props.todo.id, props.todo.completed)
    if(!res) {return;}

    await dispatch(
      toggleCompleted({
        id: props.todo.id,
        completed: props.todo.completed,
      }),
    );
  };

  const onLongPressChangeTitle = () => {
    setChangeTitle(true);
  };

  const onChangeTitle = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const titleTrim = e.nativeEvent.text.trim();
    if (!titleTrim) {return;}

    const res = await changeTitleRequest(props.todo.id, titleTrim);
    if (!res) {return;}

    await dispatch(
      changeTitleTask({
        id: props.todo.id,
        title: e.nativeEvent.text,
      }),
    );
    setChangeTitle(false);
  };

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        isChecked={props.todo.completed}
        onPress={onToggleCompleted}
        fillColor="hotpink"
      />
      {changeTitle ? (
        <TextInput
          autoFocus
          style={styles.input}
          defaultValue={props.todo.title}
          onBlur={() => setChangeTitle(false)}
          onSubmitEditing={onChangeTitle}
        />
      ) : (
        <Text
          style={props.todo.completed ? styles.completed : styles.title}
          onLongPress={onLongPressChangeTitle}>
            {props.todo.title}
        </Text>
      )}
      <ButtonSolid title="Delete" onPress={deleteTodo} />
    </View>
  );
};

export default Todo;
