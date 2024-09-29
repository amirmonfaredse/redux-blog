import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../services/blogsServices";
// const initialState = {
//   blogs: [],
//   status: "idle",
//   error: null,
// };
const blogAdaptor = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
const initialState = blogAdaptor.getInitialState({
  status: "idle",
  error: null,
});

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const addNewBlog = createAsyncThunk(
  "/blogs/addNewBlog",
  async (initialBlog) => {
    const response = await createBlog(initialBlog);
    return response.data;
  }
);
export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initailBlogId) => {
    await deleteBlog(initailBlogId);
    return initailBlogId;
  }
);
export const updateApiBlog = createAsyncThunk(
  "/blogs/updateApiBlog",
  async (initialBlog) => {
    const response = await updateBlog(initialBlog, initialBlog.id);
    return response.data;
  }
);
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // blogAdded: {
    //   reducer(state, action) {
    //     state.blogs.push(action.payload);
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: {
    //           like: 0,
    //           thumbsUp: 0,
    //           helpless: 0,
    //           sad: 0,
    //           thinking: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    blogUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingBlog = state.entities[id];
      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.content = content;
      }
    },
    // blogDeleted: (state, action) => {
    //   const { id } = action.payload;
    //   state.blogs = state.blogs.filter((blog) => blog.id !== id);
    // },
    reactionAdded: (state, action) => {
      const { blogId, reaction } = action.payload;
      const existingBlog = state.entities[blogId];
      if (existingBlog) {
        existingBlog.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "success";
        blogAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBlog.fulfilled, blogAdaptor.addOne)
      .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne)
      .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne);
  },
});

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogAdaptor.getSelectors((state) => state.blogs);

export const selectStatus = (state) => state.blogs.status;
export const selectUserBlogs = createSelector(
  [selectAllBlogs, (_, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user === userId)
);
export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogsSlice.actions;
export default blogsSlice.reducer;
