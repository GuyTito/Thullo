import { AxiosError } from "axios"
import { CardType, setCurrentCard } from "../store/cardSlice"
import { useAppDispatch } from "../store/hooks"
import interceptedAxiosPrivate from "./interceptedAxiosPrivate"


type CardUpdateType = Partial<CardType>


export default function useUpdateCard() {
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()

  const updateCard = async (_id: string, cardUpdate: CardUpdateType) => {
    try {
      const response = await axiosPrivate.patch('/cards', { _id, cardUpdate }, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.data?.updatedCard) {
        throw new Error(`Card with id ${_id} not found.`)
      } else {
        console.log('updated card', response.data)
        dispatch(setCurrentCard(response.data?.updatedCard))
      }
    } catch (error: AxiosError | any) {
      if (!error?.response) { // if error is not sent thru axios
        console.log(error.message)
      } else {
        console.log(error.response.data.message)
      }
    }
  }


  return updateCard
}