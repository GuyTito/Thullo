import { AxiosError } from "axios";
import { Dispatch, forwardRef, useState, FormEvent, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { getCurrentBoard } from "../store/boardSlice";
import { addToCards, CardType } from "../store/cardSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";


interface NewCardFormProps {
  setShowCardFormModal: Dispatch<React.SetStateAction<boolean>>
  listId: string
}


export const NewCardForm = forwardRef<HTMLFormElement, NewCardFormProps>((props, ref) => {
  const { setShowCardFormModal, listId, } = props
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState<File | undefined>(undefined);
  const [errMsg, setErrMsg] = useState('')
  const currentBoard = useAppSelector(getCurrentBoard)
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  async function submitCard(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault()
    try {
      setErrMsg('')
      const formValues = {
        listId, title, userFile: coverImg || null,
        boardId: currentBoard?._id
      }

      const response = await axiosPrivate.post('/cards', formValues, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response) {
        const data: CardType = response?.data
        dispatch(addToCards(data))
        setIsLoading(false)

        clearData()
      }
    } catch (error: AxiosError | any) {
      setIsLoading(false)
      if (!error?.response) { // if error is not sent thru axios
        setErrMsg('No Server Response');
      } else {
        setErrMsg(error.response.data.message)
      }
    }
  }

  function clearData() {
    setTitle('')
    setCoverImg(undefined)

    setShowCardFormModal(false)
  }

  useEffect(() => {
    setErrMsg('')
  }, [coverImg, title]);
  
  
  return (
    <Form onSubmit={(e) => submitCard(e)} ref={ref}>
      {errMsg && <p className="error">{errMsg}</p>}

      <button type="button" onClick={() => clearData()} className="btn-square btn-main close"><MdOutlineClose /></button>

      <div>
        {coverImg && <div className="cover">
          <img src={URL.createObjectURL(coverImg)} alt="card cover image" />
        </div> }
      </div>

      <div className="form-control input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" required placeholder="Add card title" autoFocus/>
      </div>

      <div>
        <label className={`btn-pad ${coverImg ? 'btn-selected' : 'btn-gray'}`}>
          <FaImage /> Cover
          <input type="file" accept="image/*" onChange={e => setCoverImg(e.target.files?.[0])} />
        </label>
      </div>

      <div>
        <button type="button" onClick={() => clearData()}>Cancel</button>
        <button type="submit" className="btn-pad btn-main">
          {isLoading ? 'Loading...' : 'Add card'}
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

  div:not(:last-child){
    margin-bottom: 20px;
  }

  .close{
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .cover{
    height: 85px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    /* background-color: var(--gray); */

    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .input-title{
    width: 100%;

    input{
      width: 100%;
    }
  }

  div:nth-of-type(3){
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-pad{
      display: flex;
      align-items: center;
      gap: 10px;

      input{
        display: none;
      }
    }
  }

  div:last-of-type{
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 17px;

    button:first-child{
      color: #828282;
    }
  }


`

export default NewCardForm