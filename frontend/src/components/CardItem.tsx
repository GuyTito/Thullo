import { Dispatch, forwardRef, useState, useRef, useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdEdit, MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import useUpdateCard from "../hooks/useUpdateCard";
import { deleteStoreCard, getCardById } from "../store/cardSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import TextEditor from "./TextEditor";
import { getListById } from "../store/listSlice";
import { FaUser } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";
import useAuthority from "../hooks/useAuthority";
import { lg } from "../hooks/devices";


interface CardItemProps {
  setShowCardItemModal: Dispatch<React.SetStateAction<boolean>>
  cardId: string
}


export const CardItem = forwardRef<HTMLDivElement, CardItemProps>((props, ref) => {
  const { setShowCardItemModal, cardId } = props
  const { title, coverImgUrl, description, _id, listId } = useAppSelector((state) => getCardById(state, cardId)) || {}
  const { title:listTItle } = useAppSelector((state) => getListById(state, listId || '')) || {}
  const [editDesc, setEditDesc] = useState(false);
  const descRef = useRef<HTMLDivElement>(null)
  const updateCard = useUpdateCard()
  const [isDelete, setIsDelete] = useState(false)
  const axiosPrivate = interceptedAxiosPrivate()
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useAppDispatch()
  const isAuthorized = useAuthority()


  function handleEditorContent(content: string) {
    const cardUpdate = { description: content }
    if (_id) updateCard(_id, cardUpdate)

    setEditDesc(false)
  }

  function showEditor(value: boolean) {
    setEditDesc(value)
  }

  useEffect(() => {
    if (descRef.current) descRef.current.innerHTML = description || ''

  }, [description, editDesc])

  async function deleteCard(){
    if (_id){
      try{
        setErrMsg('')
        const response = await axiosPrivate.delete('/cards', { data: { _id} })
        if (response.data?.deletedCard){
          dispatch(deleteStoreCard(_id))
          setShowCardItemModal(false)
        }
      } catch (error: AxiosError | any) {
        if (!error?.response) { // if error is not sent thru axios
          setErrMsg('No Server Response');
        } else {
          setErrMsg(error.response.data.message)
        }
      }
    }
  }


  
  return (
    <Div ref={ref}>
      {errMsg && <div className="error">{errMsg}</div>}

      <button type="button" onClick={() => setShowCardItemModal(false)} className="btn-square btn-main close">
        <MdOutlineClose />
      </button>

      {coverImgUrl && 
        <div className="cover">
          <img src={coverImgUrl} alt="card cover image" />
        </div>
      }

      <p className="title">{title}</p>
      <div className="list">In list: <span>{listTItle}</span></div>

      <div className="desc">
        <span><IoDocumentText /> Description</span>
        {!editDesc &&
          isAuthorized && <button onClick={() => setEditDesc(true)}>
            <MdEdit /> {description ? 'Edit' : 'Add'}
          </button>
        }
      </div>

      {editDesc ?
        <TextEditor text={description || ""} getEditorContent={handleEditorContent}
          showEditor={showEditor} />
      :
        <div className="ql-editor description" ref={descRef}></div>
      }

      {/* <div className="desc">
        <span><IoDocumentText /> Attachments</span>
        <button><AiOutlinePlus /> Add</button>
      </div> */}

      {isAuthorized && 
        <div className="desc"><span><FaUser /> Actions</span></div>
      }
      <div className="confirm">
        {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => setIsDelete(false)}
        > <MdOutlineClose /> </button>}

        {isAuthorized && 
          <button className="btn-pad btn-gray error" onClick={()=>setIsDelete(!isDelete)}>Delete card</button>
        }

        {isDelete && <button className="btn-square btn-gray" onClick={deleteCard}><BsCheck2 /></button>}
      </div>
    </Div>
  )
})


const Div = styled.div`
  padding: 24px;
  background-color: var(--white);
  position: relative;
  width: 85vw;
  max-height: 95vh;
  overflow-y: scroll;
  @media ${lg}{
    width: 662px;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .cover{
    height: 130px;
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
  .desc{
      margin-top: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 12px;
      color: var(--gray);
      margin-bottom: 10px;
      span{
        display: flex;
        align-items: center;
        gap: 5px;
      }
      button{
        display: flex;
        align-items: center;
        gap: 5px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        padding: 2px 8px;
      }
    }
  .title{
    font-size: 18px;
    font-weight: 500;
  }
  .list{
    font-size: 10px;
    color: var(--gray);
    span{
      font-weight: 500;
      color: black;
    }
  }
  .description{
    font-size: 14px;
    max-height: 400px;
    overflow-y: overlay;
    &.ql-editor{
      padding: 0 10px 0 0;
      height: min-content;
    }
  }
  .btn-pad{
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .confirm{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export default CardItem