import { configureStore } from '@reduxjs/toolkit';
// import { LocalStorageTools } from '../localStorage';
import todoReducer from './toDoList'
import { FilterEnum } from '../types';


const store = configureStore({
  reducer: {
    todoData: todoReducer,
  },
});

export default store;