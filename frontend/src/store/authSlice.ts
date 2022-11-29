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
  reducers: {},
})

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;