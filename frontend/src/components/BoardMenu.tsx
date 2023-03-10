import { FaLock, FaUser, FaUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import styled from "styled-components";
import formatDate from "../hooks/formatDate";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { deleteStoreBoard, getCurrentBoard } from "../store/boardSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Avatar from "./Avatar";
import { useState, Dispatch, useRef, useEffect } from 'react';
import { MdEdit, MdGroups, MdOutlineClose } from "react-icons/md";
import TextEditor from "./TextEditor";
import { BsCheck2 } from "react-icons/bs";
import useAuthority from "../hooks/useAuthority";
import { AxiosError } from "axios";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { lsm } from "../hooks/devices";
import ClickAwayListener from "react-click-away-listener";
import { BiWorld } from "react-icons/bi";
import VisibilityMenu from "./VisibilityMenu";
import Dropdown from "./Dropdown";


interface BoardMenuProps{
  setShowBoardMenu: Dispatch<React.SetStateAction<boolean>>
  boardCreator: string
}


export default function BoardMenu({ setShowBoardMenu, boardCreator }: BoardMenuProps) {
  const { createdAt, _id, description, privacy } = useAppSelector(getCurrentBoard) || {}
  const updateBoard = useUpdateBoard()
  const [editDesc, setEditDesc] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const descRef = useRef<HTMLDivElement>(null)
  const isAuthorized = useAuthority();
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showVisiblityMenu, setShowVisiblityMenu] = useState(false);
  const visibilityRef = useRef(null)


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

  async function deleteBoard() {
    if (_id) {
      try {
        const response = await axiosPrivate.delete('/boards', { data: { _id } })
        if (response.data?.deletedBoard) {
          dispatch(deleteStoreBoard(_id))
          setShowBoardMenu(false)
          navigate('/boards');
        }
      } catch (error: AxiosError | any) {
        if (!error?.response) { // if error is not sent thru axios
          console.log('No Server Response');
        } else {
          console.log(error.response.data.message)
        }
      }
    }
  }

  
  return (
    <Div>
        <div className="board-header">
        <div id="visibility-dropdown">
            <ClickAwayListener onClickAway={() => setShowVisiblityMenu(false)}>
              <Dropdown open={showVisiblityMenu} ref={visibilityRef}
                button={
                  <button onClick={() => isAuthorized && setShowVisiblityMenu(!showVisiblityMenu)} className={`btn-pad ${privacy ? 'btn-selected' : 'btn-gray'}`}>
                    {privacy ? <><FaLock /> Private</> : <><BiWorld /> Public</>}
                  </button>
                }
                content={isAuthorized && <VisibilityMenu setOpen={setShowVisiblityMenu} />}
              />
            </ClickAwayListener>
          </div>

          <button onClick={() => setShowBoardMenu(false)}><GrClose /></button>
        </div>
        <hr />
        <span className="made-by"><FaUserCircle /> Made by</span>
        <div className="creator">
          {/* <Avatar /> */}
          <div>
          <span>{boardCreator}</span>
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
      
      {isAuthorized && <div className="desc"><span><FaUser /> Actions</span></div>}
      <div className="confirm-delete">
        {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => setIsDelete(false)}
        > <MdOutlineClose /> </button>}

        {isAuthorized &&
          <button className="btn-pad btn-gray error" onClick={() => setIsDelete(!isDelete)}>Delete board</button>
        }

        {isDelete && <button className="btn-square btn-gray" onClick={deleteBoard} ><BsCheck2 /></button>}
      </div>
    </Div>
  )
}


const Div = styled.div`
  width: 377px;

  @media ${lsm}{
    width: 76vw;
  }
  .board-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    #visibility-dropdown{
      .dropdown-content{
        left: 0;
        top: 45px;
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
    margin-top: 20px;
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
