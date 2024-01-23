import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    const response = await fetch(`http://localhost:8083/api/post/all`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error geting posts", error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPosts, setLoading, setError } = postsSlice.actions;

export const getPosts = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;

export default postsSlice.reducer;
