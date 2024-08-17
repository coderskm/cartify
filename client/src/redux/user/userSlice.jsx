import { createSlice } from "@reduxjs/toolkit";

/* redux toolkit slice to track status of user whether logged in or logged out (guest or registered) and 
store user's information when logged in to allow access to resources
*/

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    setLogoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    guestUserLogin: (state) => {
      state.currentUser = "guest";
      state.isLoggedIn = true;
    },
    guestUserLogout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCurrentUser, setLogoutUser, guestUserLogin, guestUserLogout } = userSlice.actions;

export default userSlice.reducer;
