import styled from "styled-components";
import Avatar from "../components/Avatar";
import Modal from "../components/Modal";
import { useState } from 'react';
import { FaImage, FaLock } from "react-icons/fa";
import { MdOutlineClose } from 'react-icons/md';
import { FormEvent } from 'react';
import { TbEye } from "react-icons/tb";
import useCurrentUser from "../hooks/useCurrentUser";
import { useAppDispatch } from "../store/hooks";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";
import { addNewBoard } from "../store/boardSlice";



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState<File | undefined>(undefined);
  const { userId } = useCurrentUser();
  const dispatch = useAppDispatch();
  const axiosPrivate = interceptedAxiosPrivate()


  async function submitBoard(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      
      const formValues = {
        userId, title, privacy,
        userFile: coverImg || null
      }
      const formData = new FormData()
      for (const [key, value] of Object.entries(formValues)) {
        formData.append(key, value)
      }
      const response = await axiosPrivate.post('/boards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const board = response?.data
      console.log('created board', board)
      dispatch(addNewBoard(board));
      
      clearData()
    } catch (error: AxiosError | any) {
      console.log('board error', error.message, error.response.data.message)
    }

  }

  function clearData(){
    setTitle('')
    setPrivacy(false)
    setCoverImg(undefined)

    setShowModal(false)
  }

  
  return (
    <>
      <Main>
        <div className="all-boards">
          <h1>All Boards</h1>
          <button onClick={()=>setShowModal(true)} className="btn btn-main">+ Add</button>
        </div>

        <div className="boards">
          {[1,2,3,4].map(i => (
            <div key={i} className="card">
              <div className="cover">
                {/* <img src="" alt="" /> */}
              </div>
              <span>Devchallenges Board</span>
              <div className="avatars">
                {[1,2,3].map(i => (
                  <Avatar key={i} />
                ))}
                <span>+5 others</span>
              </div>
            </div>
          ))}
        </div>
      </Main>

      {/* modal */}
      {showModal && 
        <Modal setShowModal={setShowModal}>
          <ModalContent onSubmit={(e)=>submitBoard(e)}>
            <button type="button" onClick={() => clearData()} className="btn btn-main close"><MdOutlineClose /></button>
            <div className="cover">
              {coverImg && <img src={URL.createObjectURL(coverImg)} alt="board cover image" />}
            </div>
            <div className="form-control input-title">
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" required placeholder="Add board title" />
            </div>
            <div>
              <label className={`btn ${coverImg ? 'selected' : 'btn-gray'}`}>
                <FaImage /> 
                Cover
                <input type="file" accept="image/*" onChange={e => setCoverImg(e.target.files?.[0])} />
              </label>
              <label className={`btn ${privacy ? 'selected' : 'btn-gray'}`}>
                {privacy ? <><FaLock /> Private</> : <><TbEye /> Public</>}
                <input type="checkbox" checked={privacy}
                  onChange={e => setPrivacy(e.target.checked)}
                />
              </label>
            </div>
            <div>
              <button type="button" onClick={() => clearData()}>Cancel</button>
              <button type="submit" className="btn btn-main">+ &nbsp; Create</button>
            </div>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

const Main = styled.main`
  max-width: 1080px;
  margin: auto;

  .all-boards{
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
    }

  }

  .boards{
    margin-top: 40px;
    display: grid;
    gap: 36px;
    grid-template-columns: repeat(4, minmax(0, 1fr)); 

    .card{
      width:243px;
      background: var(--white);
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      padding: 12px;

      .cover{
        width: 220px;
        height: 130px;
        border-radius: 12px;
        overflow: hidden;
        background-color: var(--gray);
        border-radius: 12px;
        margin-bottom: 12px;
      }

      span{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
      }

      .avatars{
        margin-top: 20px;
        display: flex;
        gap: 12px;
        align-items: center;

        span{
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: var(--gray);
        }
      }
    }

  }
  
`

const ModalContent = styled.form`
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
    padding-left: 10px;
    padding-right: 10px;
  }

  .cover{
    height: 85px;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--gray);

    img{
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

    .btn{
      display: flex;
      align-items: center;
      gap: 10px;

      input{
        display: none;
      }

      &.selected{
        color: var(--mainColor);
        border: 1px solid var(--mainColor);
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