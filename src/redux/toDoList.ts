import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ToDoType, FilterEnum} from '../../types';
import {getTodoIdRequest, getTodosRequest} from '../db/todoApi';

export const getTodos = createAsyncThunk('todos/getTodos', getTodosRequest);
export const getTodoId = createAsyncThunk('todos/getTodoId', getTodoIdRequest);


type InitialState = {
  toDoList: ToDoType[];
  filter: FilterEnum;
  todo: ToDoType | null;
  pages: number[];
  currentPage: number;
  activeTasks: number | null;
};

const initialState: InitialState = {
  toDoList: [],
  filter: FilterEnum.all,
  pages: [1],
  todo: null,
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
      if (!action.payload) {
        return;
      }
      if (state.activeTasks === null) {
        return;
      }
      state.activeTasks++;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.toDoList.forEach(t => {
        if (t.id !== action.payload) {
          return;
        }
        if (t.completed) {
          return;
        }
        if (state.activeTasks === null) {
          return;
        }

        state.activeTasks--;
      });

      state.toDoList = state.toDoList.filter(t => t.id !== action.payload);
    },
    toggleCompleted: (
      state,
      action: PayloadAction<{id: number; completed: boolean}>,
    ) => {
      state.toDoList.forEach(t => {
        if (t.id === action.payload.id) {
          t.completed = !t.completed;
        }
      });
      if (state.activeTasks != null) {
        if (action.payload.completed) {
          ++state.activeTasks;
          return;
        }
        --state.activeTasks;
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
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      if (action.payload) {
        state.pages = action.payload.pages;
        state.toDoList = action.payload.toDoList || [];
        state.activeTasks = action.payload.activeTasks;
      }
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      console.log(`Error! Unable to get todos!`);
    });
    builder.addCase(getTodoId.fulfilled, (state, action) => {
      if (action.payload) {
        state.todo = action.payload.todo;
      }
    });
    builder.addCase(getTodoId.rejected, (state, action) => {
      console.log(`Error! Unable to get todo!`);
    });
  },
});

export default toDoList.reducer;
export const {
  changeFilter,
  addTask,
  removeTask,
  toggleCompleted,
  changeTitleTask,
  setCurrentPage,
} = toDoList.actions;
