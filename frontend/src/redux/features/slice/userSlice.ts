import { UserState } from "@/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
