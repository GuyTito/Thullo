import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface authState {
  accessToken: string
}

const initialState: authState = {
  accessToken: ''
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<authState>) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
    logOut: (state) => {
      state.accessToken = ''
    },
  }
})

export const { setCredentials, logOut } = authSlice.actions

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;