import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  userId: null,
  userToken: null,
  status: "idle",
  error: null,
};
const apiBaseUrl = "http://localhost:8084/api/user";

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
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Could not get user, ", error);
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
        `Error in authentication: ${
          error.response.data.message || error.message
        }`
      );
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    console.log(" deleting user:");
    try {
      const response = await axios.delete(`${apiBaseUrl}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      localStorage.removeItem("userToken");
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("Error deleting user", error);
      return rejectWithValue(error.response.data.message);
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
      })
      .addCase(userLogout.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userToken = action.payload.access_token;
        localStorage.setItem("userToken", action.payload.access_token);
      })
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        console.log({ action });
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const getLoggedUser = (state) => state.user.user;
export const getStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getUserId = (state) => state.user.userId;

export default userSlice.reducer;
