import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"


interface BoardType{
  user: string
  title: string
  privacy: boolean
  coverImgUrl: string
  createdAt: string
  updatedAt: string
  _id: string
}

interface boardState {
  boards: BoardType[]
}

const initialState: boardState = {
  boards: [],
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewBoard: (state, action: PayloadAction<BoardType>) => {
      state.boards.push(action.payload)
    },
  },
})

export const selectBoard = (state: RootState) => state.board

export const { addNewBoard } = boardSlice.actions

export default boardSlice.reducer;