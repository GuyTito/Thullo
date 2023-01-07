import { AxiosError } from "axios"
import { setCurrentBoard } from "../store/boardSlice"
import { useAppDispatch } from "../store/hooks"
import interceptedAxiosPrivate from "./interceptedAxiosPrivate"
import { useEffect } from 'react'

interface BoardUpdateType {
  privacy?: boolean
  title?: string
  description?: string
}


const useUpdateBoard = () =>{
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()

  // useEffect(() => {
    const updateBoard = async (_id: string, boardUpdate: BoardUpdateType) => {
      try {
        const response = await axiosPrivate.patch('/boards', { _id, boardUpdate }, {
          headers: { 'Content-Type': 'application/json' }
        })
        if (!response.data?.updatedBoard) {
          throw new Error(`Board with id ${_id} not found.`)
        } else {
          console.log('updated board', response.data)
          dispatch(setCurrentBoard(response.data?.updatedBoard))
        }
      } catch (error: AxiosError | any) {
        if (!error?.response) { // if error is not sent thru axios
          console.log(error.message)
        } else {
          console.log(error.response.data.message)
        }
      }
    }

  
    // updateBoard()
  // }, [_id, dispatch, boardUpdate])

  return updateBoard
}

export default useUpdateBoard