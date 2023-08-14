import { FilterEnum } from '../../types';
import {supabase} from './initSupabase';
import 'react-native-url-polyfill/auto';


export const getTodosRequest = async (params: {page: number, filter: FilterEnum}) => {
  const filterBoolean = (params.filter === 'all') ? [true, false]: [(params.filter === 'completed')];

  let {count, data, error} = await supabase
    .from('todo')
    .select('*', {count: 'exact'})
    .in('completed', filterBoolean)
    .order('created_at', {ascending: false})
    .range(--params.page * 5, params.page * 5 + 5);

  if (!count) {return;}
  const arr = Array.from({length: Math.ceil(count / 5)}, (e, i) => i + 1);

  let {count: activeCount, error: activeError} = await supabase
    .from('todo')
    .select('*', {count: 'exact'})
    .eq('completed', false);

  if (error || activeError)
    {console.log(error?.message, '\n', activeError?.message);}
  else {return {toDoList: data, pages: arr, activeTasks: activeCount};}
};


export const getTodoIdRequest = async (id: string) => {

  let {data, error} = await supabase
    .from('todo')
    .select('*')
    .eq('id', id)

  if(!data) {return {}}
  
  if (error) {console.log(error?.message);}
  else {return {todo: data[0] }}
};


export const addTodoRequest = async (title: string) => {
  const {error} = await supabase
    .from('todo')
    .insert([{title}]);

  if (error) {
    console.log(error.message);
  } else {return true;}
};


export const toggleCompletedRequest = async (id: number, completed: boolean) => {
  const {error} = await supabase
    .from('todo')
    .update({completed: !completed})
    .eq('id', id);

  if (error) {
    console.log(error.message);
  } else {return true;}
};


export const changeTitleRequest = async (id: number, title: string) => {
  const {error} = await supabase
    .from('todo')
    .update({title: title})
    .eq('id', id);

  if (error) {
    console.log(error.message);
  } else {return true;}
};


export const deleteTodoRequest = async (id: number) => {
  const {error} = await supabase
    .from('todo')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error.message);
  } else {return true;}
};
