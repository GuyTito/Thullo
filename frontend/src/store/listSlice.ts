import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"


interface ListType {
  _id: string
  boardId: string
  title: string
  createdAt: string
  updatedAt: string
}

interface listState {
  currentLists: ListType[]
}

const initialState: listState = {
  currentLists: []
}

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<ListType>) => {
      state.currentLists.push(action.payload)
    },
    loadLists: (state, action: PayloadAction<ListType[]>) => {
      state.currentLists = action.payload
    },
  },
})

export const getCurrentLists = (state: RootState) => state.list.currentLists

export const { addNewList, loadLists } = listSlice.actions

export default listSlice.reducer;