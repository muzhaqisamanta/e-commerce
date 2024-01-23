import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async (userData) => {
    const response = await fetch("http://localhost:8083/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await fetch(`http://localhost:8083/api/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user", error);
  }
});

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  try {
    const response = await fetch(`http://localhost:8083/api/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    if (response.ok) {
      localStorage.removeItem("userToken");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in logut", error);
  }
});

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async (userData) => {
    const response = await fetch(
      `http://localhost:8083/api/user/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        localStorage.removeItem("userToken");
      })
      .addCase(userLogout.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userToken = action.payload.access_token;
        localStorage.setItem("userToken", action.payload.access_token);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

// Actions
export const { setUser, setLoading, setError } = userSlice.actions;

// Selector
export const getLoggedUser = (state) => state.data.user;
export const getStatus = (state) => state.data.user;
export const getUserId = (state) => state.data.user;

// Reducer
export default userSlice.reducer;
