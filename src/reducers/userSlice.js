import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ["USER"],
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});
export const selectUserResult = extendedApiSlice.endpoints.getUsers.select();
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(
  //       extendedApiSlice.endpoints.getUsers.matchFulfilled,
  //       userAdapter.setAll
  //     )
  //     .addCase(
  //       extendedApiSlice.endpoints.addNewUser.matchFulfilled,
  //       userAdapter.addOne
  //     );
  //   // .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne);
  // },
});

const selectUsersData = createSelector(
  selectUserResult,
  (userResult) => userResult?.data
);
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
} = extendedApiSlice;
export default usersSlice.reducer;
