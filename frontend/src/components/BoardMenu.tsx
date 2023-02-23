import { FaUser, FaUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import styled from "styled-components";
import formatDate from "../hooks/formatDate";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { getCurrentBoard } from "../store/boardSlice";
import { useAppSelector } from "../store/hooks";
import Avatar from "./Avatar";
import { useState, Dispatch, useRef, useEffect } from 'react';
import { MdEdit, MdGroups, MdOutlineClose } from "react-icons/md";
import TextEditor from "./TextEditor";
import { BsCheck2 } from "react-icons/bs";
import useAuthority from "../hooks/useAuthority";


interface BoardMenuProps{
  setShowBoardMenu: Dispatch<React.SetStateAction<boolean>>
  boardCreator: string
}


export default function BoardMenu({ setShowBoardMenu, boardCreator }: BoardMenuProps) {
  const { title, createdAt, _id, description } = useAppSelector(getCurrentBoard) || {}
  const updateBoard = useUpdateBoard()
  const [editDesc, setEditDesc] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const descRef = useRef<HTMLDivElement>(null)
  const [renameTitle, setRenameTitle] = useState(false)
  const [boardTitle, setBoardTitle] = useState(title);
  const isAuthorized = useAuthority();




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

  function updateBoardTitle(){
    const boardUpdate = { title: boardTitle }
    if (_id) updateBoard(_id, boardUpdate)
    setRenameTitle(false)
  }

  
  return (
    <Div>
        <div className="board-header">
          {renameTitle ?
            <form onSubmit={updateBoardTitle} className="board-title">
              <input onChange={(e) => setBoardTitle(e.target.value)} value={boardTitle} type="text" autoFocus />
              <button type="button" onClick={() => setRenameTitle(false)}><MdOutlineClose /></button>
              <button type="submit"><BsCheck2 /></button>
            </form>
            :
            <div className="board-title">
              <h3>{title}</h3>
              {isAuthorized && <button onClick={() => setRenameTitle(true)}><MdEdit /></button>}
            </div>
          }
          <button onClick={() => setShowBoardMenu(false)}><GrClose /></button>
        </div>
        <hr />
        <span className="made-by"><FaUserCircle /> Made by</span>
        <div className="creator">
          {/* <Avatar /> */}
          <div>
          <span>{boardCreator || '[deleted]'}</span>
            {createdAt && <span>on {formatDate(createdAt)}</span>}
          </div>
        </div>
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

        {/* <div className="team"><MdGroups /> Team</div>
        <div className="members">
          <div>
            <div className="name-avatar">
              <Avatar />
            <span>{boardCreator || '[deleted]'}</span>
            </div>
            <span className="admin">Admin</span>
          </div>
          {[1, 2].map(i => (
            <div key={i}>
              <div className="name-avatar">
                <Avatar />
                <span>Bianca Fianyo</span>
              </div>
              <button className="btn-error">Remove</button>
            </div>
          ))}
        </div> */}
      
      <div className="desc"><span><FaUser /> Actions</span></div>
      <div className="confirm-delete">
        {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => setIsDelete(false)}
        > <MdOutlineClose /> </button>}

        {isAuthorized &&
          <button className="btn-pad btn-gray" onClick={() => setIsDelete(!isDelete)}>Delete</button>
        }

        {isDelete && <button className="btn-square btn-gray" ><BsCheck2 /></button>}
      </div>
    </Div>
  )
}


const Div = styled.div`
  width: 377px;
  .board-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .board-title{
      display: flex;
      align-items: center;
      gap: 12px;
      h3{
        font-weight: 600;
      }
      button{
        color: var(--gray);
      }
      input{
        background-color: transparent;
        outline-color: var(--gray);
        padding-left: 5px;
      }
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
    font-size: 14px;
    max-height: 400px;
    overflow-y: overlay;
    &.ql-editor{
      padding: 0 10px 0 0;
    }
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
  .confirm-delete{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`
