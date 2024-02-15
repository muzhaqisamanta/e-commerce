import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apibaseUrl = "http://localhost:8083/api/post";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apibaseUrl}/all`);
      return response.data;
    } catch (error) {
      console.log("Error geting posts", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postForm, { rejectWithValue }) => {
    console.log(postForm);
    try {
      const response = await axios.post(`${apibaseUrl}/create`, postForm, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Error adding new post", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log({ action });
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
