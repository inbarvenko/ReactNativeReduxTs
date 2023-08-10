import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ToDoType, FilterEnum} from '../../types';
import {
  addTodo,
  changeTitle,
  deleteTodo,
  getTodos,
  toggleCompleted,
} from '../db/todoApi';

type InitialState = {
  toDoList: ToDoType[];
  filter: FilterEnum;
  pages: number[];
  currentPage: number;
  activeTasks: number | null;
};

const initialState: InitialState = {
  toDoList: [],
  filter: FilterEnum.all,
  pages: [1],
  currentPage: 1,
  activeTasks: 0,
};

const toDoList = createSlice({
  name: 'ToDoList',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<FilterEnum>) => {
      state.filter = action.payload;
    },
    addTask: (state, action: PayloadAction<string>) => {
      const titleTrim = action.payload.trim();
      if (titleTrim) {
        const newTask: ToDoType = {
          title: titleTrim,
          completed: false,
          id: Date.now(),
        };

        addTodo(newTask);
        if (state.currentPage == 1) {
          state.toDoList.unshift(newTask);
          state.toDoList.pop();
        }
        if (state.activeTasks != null) state.activeTasks++;
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      deleteTodo(action.payload);
    },
    changeStatusTask: (
      state,
      action: PayloadAction<{id: number; completed: boolean}>,
    ) => {
      toggleCompleted(action.payload.id, action.payload.completed);
      // state.toDoList.forEach(t => {
      //   if (t.id == action.payload.id) {
      //     t.completed = !t.completed;
      //   }
      // });
      if (state.activeTasks != null) {
        if (action.payload.completed) ++state.activeTasks;
        else --state.activeTasks;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeTitleTask: (
      state,
      action: PayloadAction<{id: number; title: string}>,
    ) => {
      state.toDoList.forEach(item => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title.trim();
        }
        return item;
      });
      changeTitle(action.payload.id, action.payload.title.trim());
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      try {
        if (action.payload) {
          state.pages = action.payload.pages;
          state.toDoList = action.payload.toDoList || [];
          state.activeTasks = action.payload.activeTasks;
        }
      } catch (err) {
        console.log(`111 Error! Unable to get todos! ${err}`);
      }
    });

    builder.addCase(getTodos.rejected, (state, action) => {
      console.log(`222 Error! Unable to get todos!`);
    });
  },
});

export default toDoList.reducer;
export const {
  changeFilter,
  addTask,
  removeTask,
  changeStatusTask,
  changeTitleTask,
  setCurrentPage,
} = toDoList.actions;
