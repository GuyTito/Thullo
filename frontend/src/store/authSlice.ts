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

export const logout = createAsyncThunk('auth/logout', async()=>{
  const response = await axios.get('/auth/logout', {
    withCredentials: true
  });
  const message = response?.data?.message;
  return message;
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = ''
        console.log('logout')
      })
  }
})

export const { setCredentials, } = authSlice.actions

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;