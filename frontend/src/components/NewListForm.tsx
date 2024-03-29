import styled from "styled-components";
import { FormEvent, useState, Dispatch, forwardRef } from "react";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { addNewList } from "../store/listSlice";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentBoard } from "../store/boardSlice";


interface NewListFormProps{
  setShowListModal: Dispatch<React.SetStateAction<boolean>>
}


export const NewListForm = forwardRef<HTMLFormElement, NewListFormProps>((props, ref) => {
  const { setShowListModal } = props

  const [listTitle, setListTitle] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()
  const currentBoard = useAppSelector(getCurrentBoard)

  
  async function addList(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault()
    try {
      const response = await axiosPrivate.post(
        '/lists',
        { boardId: currentBoard?._id, title: listTitle },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response) {
        const data = response?.data
        dispatch(addNewList(data));
        setIsLoading(false)

        cancelList()
      }
    } catch (error: AxiosError | any) {
      setIsLoading(false)
      if (!error?.response) { // if error is not sent thru axios
        setErrMsg(error.message)
      } else {
        setErrMsg(error.response.data.message)
      }
    }

  }

  function cancelList() {
    setListTitle('')
    setShowListModal(false)
  }


  return (
    <Form onSubmit={(e) => addList(e)} ref={ref}>
      {errMsg && <p className="error">{errMsg}</p>}

      <div className="form-control">
        <input onChange={(e) => setListTitle(e.target.value)} value={listTitle} type="text" required autoFocus />
      </div>
      <div className="bottom">
        <button onClick={cancelList} type="button">Cancel</button>
        <button type="submit" className="btn-pad btn-main">
          {isLoading ? 'Loading...' : 'Add list'}
        </button>
      </div>
    </Form>
  )
})


const Form = styled.form`
  padding: 24px;
  background-color: var(--white);
  position: relative;
  width: 348px;
  .bottom{
    display: flex;
    justify-content: end;
    gap: 12px;
    align-items: center;
    margin-top: 20px;
  }
`

export default NewListForm