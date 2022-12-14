import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import boardReducer from "./boardSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;