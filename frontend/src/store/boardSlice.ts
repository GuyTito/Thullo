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
    loadBoards: (state, action: PayloadAction<BoardType[]>) => {
      state.boards = action.payload
    },
  },
})

export const getBoards = (state: RootState) => state.board.boards

export const { addNewBoard, loadBoards } = boardSlice.actions

export default boardSlice.reducer;