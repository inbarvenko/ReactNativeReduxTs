import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './toDoList'


const store = configureStore({
  reducer: {
    todoData: todoReducer,
  },
});

export default store;