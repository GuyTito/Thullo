import styled from "styled-components";
import { useState, Dispatch } from 'react';
import { FaImage, FaLock } from "react-icons/fa";
import { MdOutlineClose } from 'react-icons/md';
import { FormEvent, forwardRef } from 'react';
import useCurrentUser from "../hooks/useCurrentUser";
import { useAppDispatch } from "../store/hooks";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";
import { addNewBoard } from "../store/boardSlice";
import { BiWorld } from "react-icons/bi";


interface NewBoardFormProps {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const NewBoardForm = forwardRef<HTMLFormElement, NewBoardFormProps>((props, ref) => {
  const { setShowModal } = props

  const [privacy, setPrivacy] = useState(false);
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState<File | undefined>(undefined);
  const [errMsg, setErrMsg] = useState('')

  const { userId } = useCurrentUser();
  const dispatch = useAppDispatch();
  const axiosPrivate = interceptedAxiosPrivate()


  async function submitBoard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setErrMsg('')
      const formValues = {
        userId, title, privacy,
        userFile: coverImg || null
      }
      const response = await axiosPrivate.post('/boards', formValues, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response){
        const data = response?.data
        console.log('created board', response)
        dispatch(addNewBoard(data));
        
        clearData()
      }
    } catch (error: AxiosError | any) {
      console.log('board error', error.message, error.response.data.message)
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(error.response.data.message);
      }
    }

  }

  function clearData() {
    setTitle('')
    setPrivacy(false)
    setCoverImg(undefined)

    setShowModal(false)
  }
  
  
  return (
    <Form onSubmit={(e) => submitBoard(e)} ref={ref}>
      {errMsg && <p className="error">{errMsg}</p>}

      <button type="button" onClick={() => clearData()} className="btn-square btn-main close"><MdOutlineClose /></button>

      <div>
        {coverImg && <div className="cover">
          <img src={URL.createObjectURL(coverImg)} alt="board cover image" />
        </div> }
      </div>

      <div className="form-control input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" required placeholder="Add board title" autoFocus />
      </div>
      <div>
        <label className={`btn-pad ${coverImg ? 'btn-selected' : 'btn-gray'}`}>
          <FaImage />
          Cover
          <input type="file" accept="image/*" onChange={e => setCoverImg(e.target.files?.[0])} />
        </label>
        <label className={`btn-pad ${privacy ? 'btn-selected' : 'btn-gray'}`}>
          {privacy ? <><FaLock /> Private</> : <><BiWorld /> Public</>}
          <input type="checkbox" checked={privacy}
            onChange={e => setPrivacy(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={() => clearData()}>Cancel</button>
        <button type="submit" className="btn-pad btn-main">+ &nbsp; Create</button>
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
    background-color: var(--gray);

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
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

export default NewBoardForm