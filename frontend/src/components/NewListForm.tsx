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
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()
  const currentBoard = useAppSelector(getCurrentBoard)

  
  async function addList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await axiosPrivate.post(
        '/boards/lists',
        { boardId: currentBoard?._id, title: listTitle },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response) {
        const data = response?.data
        console.log('created list', response)
        dispatch(addNewList(data));

        cancelList()
      }
    } catch (error: AxiosError | any) {
      if (!error?.response) { // if error is not sent thru axios
        console.log(error.message)
      } else {
        console.log(error.response.data.message)
      }
    }

  }

  function cancelList() {
    setListTitle('')
    setShowListModal(false)
  }


  return (
    <Form onSubmit={(e) => addList(e)} ref={ref}>
      <div className="form-control">
        <input onChange={(e) => setListTitle(e.target.value)} value={listTitle} type="text" />
      </div>
      <div className="bottom">
        <button onClick={cancelList} type="button">Cancel</button>
        <button type="submit" className="btn-pad btn-main">Add list</button>
      </div>
    </Form>
  )
})


const Form = styled.form`
  padding: 24px;
  background-color: var(--white);
  position: relative;
  .bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
`

export default NewListForm