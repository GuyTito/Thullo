import { Dispatch, forwardRef, useState, FormEvent } from "react";
import { FaImage } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";


interface NewCardFormProps {
  setShowCardFormModal: Dispatch<React.SetStateAction<boolean>>
}


export const NewCardForm = forwardRef<HTMLFormElement, NewCardFormProps>((props, ref) => {
  const { setShowCardFormModal } = props
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState<File | undefined>(undefined);
  const [errMsg, setErrMsg] = useState('')

  function submitCard(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
  }

  function clearData() {
    setTitle('')
    setCoverImg(undefined)

    setShowCardFormModal(false)
  }
  
  return (
    <Form onSubmit={(e) => submitCard(e)} ref={ref}>
      {errMsg && <p className="error">{errMsg}</p>}

      <button type="button" onClick={() => clearData()} className="btn-square btn-main close"><MdOutlineClose /></button>

      <div className="cover">
        {coverImg && <img src={URL.createObjectURL(coverImg)} alt="board cover image" />}
      </div>

      <div className="form-control input-title">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" required placeholder="Add board title" />
      </div>

      <div>
        <label className={`btn-pad ${coverImg ? 'btn-selected' : 'btn-gray'}`}>
          <FaImage /> Cover
          <input type="file" accept="image/*" onChange={e => setCoverImg(e.target.files?.[0])} />
        </label>
      </div>

      <div>
        <button type="button" onClick={() => clearData()}>Cancel</button>
        <button type="submit" className="btn-pad btn-main">Add card</button>
      </div>
    </Form>
  )
})


const Form = styled.form`
  padding: 24px;
  background-color: var(--white);
  position: relative;

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
    width: 300px;
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

export default NewCardForm