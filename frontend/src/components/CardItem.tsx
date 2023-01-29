import { Dispatch, forwardRef, useState, useRef, useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdEdit, MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { getCurrentCard } from "../store/cardSlice";
import { useAppSelector } from "../store/hooks";
import TextEditor from "./TextEditor";


interface CardItemProps {
  setShowCardItemModal: Dispatch<React.SetStateAction<boolean>>
}


export const CardItem = forwardRef<HTMLDivElement, CardItemProps>((props, ref) => {
  const { setShowCardItemModal } = props
  const { title, coverImgUrl, description } = useAppSelector(getCurrentCard) || {}
  const [editDesc, setEditDesc] = useState(false);
  const descRef = useRef<HTMLDivElement>(null)

  function handleEditorContent(content: string) {
    console.log('content', content)
    // const boardUpdate = { description: content }
    // if (_id) updateBoard(_id, boardUpdate)

    setEditDesc(false)
  }

  function showEditor(value: boolean) {
    setEditDesc(value)
  }

  useEffect(() => {
    if (descRef.current) descRef.current.innerHTML = description || ''

  }, [description, editDesc])


  
  return (
    <Div ref={ref}>
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
          <p>{title}</p>

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
        </div>

        <div className="right">
          actions
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
    .left{
      width: 70%;
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
      .description{
        font-size: 14px;
        max-height: 400px;
        overflow-y: overlay;
        &.ql-editor{
          padding: 0 10px 0 0;
        }
      }
    }
    .right{
      width: 22%;
    }
  }
`

export default CardItem