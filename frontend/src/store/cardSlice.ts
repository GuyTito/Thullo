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
  cards: CardType[]
}

const initialState: cardState = {
  cards: []
}

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCards: (state, action: PayloadAction<CardType>) => {
      state.cards.push(action.payload)
    },
    updateStoreCard: (state, action: PayloadAction<CardType>) => {
      const updatedCard = action.payload
      const index = state.cards.findIndex(card => card._id === updatedCard._id)

      state.cards[index] = updatedCard
    },
    deleteStoreCard: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.cards = state.cards.filter(card => card._id !== id)
    },
    loadCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
  },
})

export const getCardById = (state: RootState, id: string) => state.card.cards.find(card => card._id === id)
export const getCardsByListId = (state: RootState, listId: string) => state.card.cards.filter(card => card.listId === listId)

export const { loadCards, addToCards, updateStoreCard, deleteStoreCard } = cardSlice.actions

export default cardSlice.reducer;