import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { notification } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';

interface UserState {
  list: User.Summary[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await UserService.getAllUsers();
    } catch (err) {
      return rejectWithValue({ ...err });
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (user: User.Summary | User.Detailed) => {
    user.active === true
      ? await UserService.deactivateExistingUser(user.id)
      : await UserService.activateExistingUser(user.id);

    return user;
  }
);
export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers, toggleUserStatus);
  const error = isRejected(getAllUsers, toggleUserStatus);
  const loading = isPending(getAllUsers, toggleUserStatus);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    /*
    .addCase(
      toggleUserStatus.fulfilled,
      (state, action) => {
        state.list = state.list.map((user) => {
          if (user.id === action.payload.id)
            return { ...user, active: !user.active };
          return user;
        });
      }
    )
    */
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state, action) => {
      state.fetching = false;
      notification.error({
        message: action.error.message,
      });
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
