import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"


export interface CardType {
  _id: string
  listId: string
  title: string
  coverImgUrl: string
  description: string
  createdAt: string
  updatedAt: string
}

interface cardState {
  currentCard: CardType | null
}

const initialState: cardState = {
  currentCard: null
}

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCurrentCard: (state, action: PayloadAction<CardType | null>) => {
      state.currentCard = action.payload
    }
  },
})

export const getCurrentCard = (state: RootState) => state.card.currentCard

export const { setCurrentCard, } = cardSlice.actions

export default cardSlice.reducer;