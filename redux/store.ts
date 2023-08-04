import { configureStore } from '@reduxjs/toolkit';
// import { LocalStorageTools } from '../localStorage';
import todoReducer from './toDoList'
import { FilterEnum } from '../types';


const store = configureStore({
  devTools: true,
  reducer: {
    todoData: todoReducer,
  },
  preloadedState: {
    todoData: {
        toDoList: [],
        filter: FilterEnum.all
    //   toDoList: LocalStorageTools.getItemFromLocalStorage('todo', []),
    //   filter: LocalStorageTools.getItemFromLocalStorage('filter', FilterEnum.all)
    }
  },
});

export default store;