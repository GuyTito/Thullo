import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../api/axios";
import { RootState } from "./store";


interface authState {
  accessToken: string
  persist: boolean
  errorMsg?: unknown
}

const initialState: authState = {
  accessToken: '',
  persist: JSON.parse(localStorage.getItem('persist') as string) || false,
}

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (_, thunkAPI)=>{
  try {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    })
    const accessToken = response?.data?.accessToken;
    return accessToken
  } catch (error: AxiosError | any) {
    return thunkAPI.rejectWithValue(`${error.message}. ${error.response.data.message}`)
  }
})

export const logout = createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
  await axios.get('/auth/logout', {
    withCredentials: true
  });
  thunkAPI.dispatch(setCredentials(''))
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setPersist: (state, action: PayloadAction<boolean>) => {
      state.persist = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.errorMsg = action.payload
        console.log('refresh error', state.errorMsg)
      })
  }
})

export const { setCredentials, setPersist } = authSlice.actions

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;