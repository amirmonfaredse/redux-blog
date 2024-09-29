import {
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const selectUserResult = apiSlice.endpoints.getUsers.select();

const emptyUsers = [];
export const selectAllUsers = createSelector(
  selectUserResult,
  (userResult) => userResult?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
);
// const userAdaptor = createEntityAdapter();
// const initialState = userAdaptor.getInitialState();
// export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
//   const response = await getAllUsers();
//   return response.data;
// });
// export const deleteApiUser = createAsyncThunk(
//   "/users/deleteApiUser",
//   async (initialUserId) => {
//     await deleteUser(initialUserId);
//     return initialUserId;
//   }
// );
// export const addNewUser = createAsyncThunk(
//   "/users/addNewUser",
//   async (initialUser) => {
//     const response = await createUser(initialUser);
//     return response.data;
//   }
// );
const usersSlice = createSlice({
  name: "users",
  initialState: emptyUsers,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
  //     .addCase(addNewUser.fulfilled, userAdaptor.addOne)
  //     .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne);
  // },
});
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
// } = userAdaptor.getSelectors((state) => state.users);

export default usersSlice.reducer;
