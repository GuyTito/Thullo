import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { RootState } from "./store";


interface authState {
  accessToken: string
}

const initialState: authState = {
  accessToken: ''
}

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async ()=>{
  const response = await axios.get('/auth/refresh', {
    withCredentials: true
  });
  const accessToken = response?.data?.accessToken;
  return accessToken
})

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
  },
  extraReducers(builder) {
    builder
      .addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
      })
  }
})

export const { setCredentials, logOut } = authSlice.actions

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;