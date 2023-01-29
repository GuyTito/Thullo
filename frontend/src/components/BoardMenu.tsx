import { FaUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import styled from "styled-components";
import formatDate from "../hooks/formatDate";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { getCurrentBoard } from "../store/boardSlice";
import { useAppSelector } from "../store/hooks";
import Avatar from "./Avatar";
import { useState, Dispatch, useRef, useEffect } from 'react';
import { MdEdit, MdGroups } from "react-icons/md";
import TextEditor from "./TextEditor";


interface BoardMenuProps{
  setShowBoardMenu: Dispatch<React.SetStateAction<boolean>>
}


export default function BoardMenu({ setShowBoardMenu }: BoardMenuProps) {
  const { createdAt, _id, description } = useAppSelector(getCurrentBoard) || {}
  const updateBoard = useUpdateBoard()
  const [editDesc, setEditDesc] = useState(false);
  const descRef = useRef<HTMLDivElement>(null)

  


  function handleEditorContent(content: string) {
    console.log('content', content)
    const boardUpdate = { description: content }
    if (_id) updateBoard(_id, boardUpdate)

    setEditDesc(false)
  }

  function showEditor(value: boolean){
    setEditDesc(value)
  }

  useEffect(()=>{
    if (descRef.current) descRef.current.innerHTML = description || ''

  }, [description, editDesc])

  
  return (
    <Div>
        <div className="header">
          <h3>Menu</h3>
          <button onClick={() => setShowBoardMenu(false)}><GrClose /></button>
        </div>
        <hr />
        <span className="made-by"><FaUserCircle /> Made by</span>
        <div className="creator">
          <Avatar />
          <div>
            <span>Daniel Akrofi</span>
            {createdAt && <span>on {formatDate(createdAt)}</span>}
          </div>
        </div>
        <div className="desc">
          <span><IoDocumentText /> Description</span>
        {!editDesc && <button onClick={() => setEditDesc(true)}><MdEdit /> Edit</button>}
        </div>

        {editDesc ?
          <TextEditor text={description || ""} getEditorContent={handleEditorContent} 
            showEditor={showEditor} />
        :
          <div className="description ql-editor" ref={descRef}></div>
        }

        <div className="team"><MdGroups /> Team</div>
        <div className="members">
          <div>
            <div className="name-avatar">
              <Avatar />
              <span>Daniel Akrofi</span>
            </div>
            <span className="admin">Admin</span>
          </div>
          {[1, 2].map(i => (
            <div key={i}>
              <div className="name-avatar">
                <Avatar />
                <span>Bianca Soulsa</span>
              </div>
              <button className="btn-error">Remove</button>
            </div>
          ))}
        </div>
    </Div>
  )
}


const Div = styled.div`
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      font-weight: 600;
    }
  }
  hr{
    margin: 10px 0;
    color: var(--gray);
  }
  .made-by{
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--gray);
    font-size: 12px;
    margin-bottom: 13px;
  }
  .creator{
    display: flex;
    align-items: center;
    gap: 12px;
    div{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      span:first-of-type{
        font-weight: 600;
      }
      span:last-of-type{
        color: var(--gray);
        font-size: 12px;
      }
    }
  }
  .desc{
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
    width: 300px;
    font-size: 14px;
    max-height: 400px;
    overflow-y: overlay;
    padding-right: 10px;
  }
  .team{
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--gray);
    margin-top: 24px;
    margin-bottom: 10px;
  }
  .members{
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name-avatar{
        gap: 12px;       span{
          font-weight: 600;
        }
      }
      .admin{
        color: var(--gray);
        font-size: 12px;
      }
      button{
        font-size: 12px;
        color: var(--error);
        padding: 2px 8px;
        border-radius: 8px;
        border: 1px solid var(--error);
      }
    }
    div:not(:last-of-type){
      margin-bottom: 10px;
    }
  }
`
