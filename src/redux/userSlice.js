import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser || null, // Parse user object if it exists
  token: storedToken || null, // Token will be null if not present
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Store the user and token in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store user as string
      localStorage.setItem("token", action.payload.token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;

      // Remove user and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
