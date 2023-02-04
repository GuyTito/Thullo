import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"


export interface ListType {
  _id: string
  boardId: string
  title: string
  createdAt: string
  updatedAt: string
}

interface listState {
  lists: ListType[]
}

const initialState: listState = {
  lists: []
}

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<ListType>) => {
      state.lists.push(action.payload)
    },
    loadLists: (state, action: PayloadAction<ListType[]>) => {
      state.lists = action.payload
    },
  },
})

export const getLists = (state: RootState) => state.list.lists
export const getListById = (state: RootState, id: string) => state.list.lists.find(list => list._id === id)

export const { addNewList, loadLists } = listSlice.actions

export default listSlice.reducer;