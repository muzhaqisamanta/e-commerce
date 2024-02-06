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

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postForm, { rejectWithValue }) => {
    console.log(postForm);
    try {
      const response = await fetch(`http://localhost:8083/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(postForm),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: User token is invalid or expired");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
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
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log({ action });
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        console.log("in rejected", action);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPosts, setLoading, setError } = postsSlice.actions;

export const getPosts = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;

export default postsSlice.reducer;
