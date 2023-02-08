import { Dispatch, forwardRef, useState, useRef, useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdEdit, MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import useUpdateCard from "../hooks/useUpdateCard";
import { deleteStoreCard, getCardById } from "../store/cardSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import TextEditor from "./TextEditor";
import { AiOutlinePlus } from "react-icons/ai";
import { getListById } from "../store/listSlice";
import { FaImage, FaTrash, FaUser } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";


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

      <div className="container">
        <div className="left">
          <p className="title">{title}</p>
          <div className="list">In list: <span>{listTItle}</span></div>

          <div className="desc">
            <span><IoDocumentText /> Description</span>
            {!editDesc && <button onClick={() => setEditDesc(true)}><MdEdit /> Edit</button>}
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
        </div>

        <div className="right">
          <div className="desc"><span><FaUser /> Actions</span></div>
          <div className="confirm">
            {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => setIsDelete(false)}
            > <MdOutlineClose /> </button>}

            <button className="btn-pad btn-gray" onClick={()=>setIsDelete(!isDelete)}>Delete</button>

            {isDelete && <button className="btn-square btn-gray" onClick={deleteCard}><BsCheck2 /></button>}
          </div>
        </div>
      </div>
    </Div>
  )
})


const Div = styled.div`
  padding: 24px;
  background-color: var(--white);
  position: relative;
  width: 662px;
  max-height: 100vh;
  overflow-y: scroll;
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
  .container{
    display: flex;
    gap: 24px;
    margin-top: 24px;
    /* justify-content: space-between; */
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
    .left{
      width: 75%;
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
    }
    .right{
      width: 22%;
      .btn-pad{
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .confirm{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`

export default CardItem