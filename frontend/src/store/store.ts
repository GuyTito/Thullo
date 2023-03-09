import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import boardReducer from "./boardSlice";
import listReducer from "./listSlice";
import cardReducer from "./cardSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    list: listReducer,
    card: cardReducer,
  },
  devTools: false
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;