import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  userId: null,
  userToken: null,
  status: "idle",
  error: null,
};
const apiBaseUrl = "http://localhost:8083/api/user";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const response = await axios.post(`${apiBaseUrl}/register`, userData);
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Error registering user:", error);
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("No user found");
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  try {
    await axios.post(`${apiBaseUrl}/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    localStorage.removeItem("userToken");
    return true;
  } catch (error) {
    console.error("Error in logut", error);
    return false;
  }
});

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/authenticate`, userData);
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(
        `Error in authentication: ${error.response.data.error}`
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.status = "logedOut";
        state.user = null;
        localStorage.removeItem("userToken");
      })
      .addCase(userLogout.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userToken = action.payload.access_token;
        localStorage.setItem("userToken", action.payload.access_token);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getLoggedUser = (state) => state.user.user;
export const getStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getUserId = (state) => state.user.userId;

export default userSlice.reducer;
