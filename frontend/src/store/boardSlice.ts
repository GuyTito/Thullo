import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"


export interface BoardType{
  userId: string
  title: string
  privacy: boolean
  coverImgUrl: string
  createdAt: string
  updatedAt: string
  _id: string
  description: string
}

interface boardState {
  boards: BoardType[]
  currentBoard: BoardType | null
}

const initialState: boardState = {
  boards: [],
  currentBoard: null
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
    setCurrentBoard: (state, action: PayloadAction<BoardType | null>) => {
      state.currentBoard = action.payload
    }
  },
})

export const getBoards = (state: RootState) => state.board.boards
export const getCurrentBoard = (state: RootState) => state.board.currentBoard

export const { addNewBoard, loadBoards, setCurrentBoard } = boardSlice.actions

export default boardSlice.reducer;