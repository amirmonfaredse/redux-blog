import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  tagTypes: ["BLOG", "USER"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: (result = [], error, arg) => [
        "BLOG",
        ...result.map(({ id }) => ({ type: "BLOG", id })),
      ],
    }),
    getBlog: builder.query({
      query: (initialBlogId) => `/blogs/${initialBlogId}`,
      providesTags: (result, error, arg) => [{ type: "BLOG", id: arg }],
    }),
    addNewBlog: builder.mutation({
      query: (initialBlog) => ({
        url: "/blogs",
        method: "POST",
        body: initialBlog,
      }),
      invalidatesTags: ["BLOG"],
    }),
    editBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog.id}`,
        method: "PUT",
        body: blog,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "BLOG", id: arg.id }],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result = [], error, arg) => [
        "USER",
        ...result.map(({ id }) => ({ type: "USER", id })),
      ],
    }),
    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users",
        method: "POST",
        body: initialUser,
      }),
      invalidatesTags: ["USER"],
    }),
    removeUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddNewBlogMutation,
  useEditBlogMutation,
  useGetUsersQuery,
  useAddNewUserMutation,
  useRemoveUserMutation
} = apiSlice;
