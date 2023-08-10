import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToDoType } from "../../types";
import { supabase } from "./initSupabase";
import 'react-native-url-polyfill/auto'

const makeArray = (num: number) => {
    const array = [];
    num = Math.ceil(num/5)
    while(num>0){
      array.unshift(num--);
    }
    return array;
  };

export const getTodos = createAsyncThunk(
    "todos/getTodos", async (page: number) => {
        console.log('hii')
    let res = await supabase
    .from('todo')
    .select('*', { count: 'exact' })
    .range(--page * 5, page * 5 + 4)
    .order('id', { ascending: false });

    let arr = [1];
    if(res.count) arr = makeArray(res.count);

    let tasks = await supabase
    .from('todo')
    .select('*', { count: 'exact' })
    .eq('completed', false)

    // console.log('tasks:' , tasks, '\n', )

    if (res.error || tasks.error) console.log(res.error?.message, '\n',  tasks.error?.message);
    else return {toDoList: res.data, pages: arr, activeTasks: tasks?.count};
})

export  const addTodo = async (newTask: ToDoType) => {
      let { data, error } = await supabase
        .from('todo')
        .insert([ newTask ])
      if (error) console.log(error.message);
      else return data;
}

export const toggleCompleted = async (id: number, completed: boolean) => {
    const { data, error } = await supabase
        .from('todo')
        .update({ completed: !completed })
        .eq('id', id)
    if (error) console.log(error.message)
    else return data;
}

export const changeTitle = async (id: number, title: string) => {
    const { data, error } = await supabase
        .from('todo')
        .update({ title: title })
        .eq('id', id)
    if (error) console.log(error.message)
    else return data;
}

export const deleteTodo = async (id: number) => {
    const { error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id)
    if (error) console.log(error.message)
    else return true;
}