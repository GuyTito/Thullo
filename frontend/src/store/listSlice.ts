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
    deleteStoreList: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.lists = state.lists.filter(list => list._id !== id)
    },
  },
})

export const getLists = (state: RootState) => state.list.lists
export const getListById = (state: RootState, id: string) => state.list.lists.find(list => list._id === id)

export const { addNewList, loadLists, deleteStoreList } = listSlice.actions

export default listSlice.reducer;