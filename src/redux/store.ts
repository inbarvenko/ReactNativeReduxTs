import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './toDoList'
import userReducer from './userReducer';


const store = configureStore({
  reducer: {
    todoData: todoReducer,
    userData: userReducer,
  },
});

export default store;