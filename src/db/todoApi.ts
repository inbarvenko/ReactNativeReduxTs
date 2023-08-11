import {supabase} from './initSupabase';
import 'react-native-url-polyfill/auto';


export const getTodosRequest = async (page: number) => {
  let {count, data, error} = await supabase
    .from('todo')
    .select('*', {count: 'exact'})
    .order('created_at', {ascending: false})
    .range(--page * 5, page * 5 + 5);

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
