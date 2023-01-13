import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import boardReducer from "./boardSlice";
import listReducer from "./listSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    list: listReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;