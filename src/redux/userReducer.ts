import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types';

const initialState: IUser = {
  id: null,
  username: null,
  email: null,
};

const userData = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    removeUser: (state) => {
        state.id = null;
        state.email = null;
        state.username= null;
        console.log('state', state)
      },
  },
});

export default userData.reducer;
export const {setUser, removeUser} = userData.actions;
