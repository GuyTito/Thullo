import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate"
import { RootState } from "./store"


// const axiosPrivate = interceptedAxiosPrivate()

interface BoardType{
  user: string
  title: string
  privacy: boolean
  coverImgUrl: string
}

interface boardState {
  boards: BoardType[]
}

const initialState: boardState = {
  boards: [],
}

// export const createNewBoard = createAsyncThunk('board/create', async (newBoard: BoardType) => {
//   const response = await axiosPrivate.post('/boards', newBoard);
//   return response?.data
  
// })

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(createNewBoard.fulfilled, (state, action: PayloadAction<BoardType>) => {
      //   state.boards.push(action.payload)
      // })
  }
})

export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer;