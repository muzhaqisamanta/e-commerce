import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apibaseUrl = "http://localhost:8084/api/post";

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

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apibaseUrl}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error geting posts", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apibaseUrl}/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error geting post by id", error);
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
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    console.log(postId);
    try {
      const response = await axios.delete(`${apibaseUrl}/delete/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Error deleting post", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, data }, { rejectWithValue }) => {
    console.log(postId, data);
    try {
      const response = await axios.put(`${apibaseUrl}/edit/${postId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Error editing post", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const sortPosts = (posts) => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
  );
  return sortedPosts;
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    createdStatus: "idle",
    userPosts: [],
    post: null,
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
        state.posts = sortPosts(action.payload.content);
      })
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = sortPosts(action.payload.content);
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.createdStatus = "succeeded";
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const getPosts = (state) => state.posts.posts;
export const getPost = (state) => state.posts.post;
export const getProfilePosts = (state) => state.posts.userPosts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
