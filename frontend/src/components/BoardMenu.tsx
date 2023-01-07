import { FaUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import styled from "styled-components";
import formatDate from "../hooks/formatDate";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { getCurrentBoard } from "../store/boardSlice";
import { useAppSelector } from "../store/hooks";
import Avatar from "./Avatar";
import { useState, Dispatch } from 'react';
import { MdEdit, MdGroups } from "react-icons/md";


interface BoardMenuProps{
  setShowBoardMenu: Dispatch<React.SetStateAction<boolean>>
}


export default function BoardMenu({ setShowBoardMenu }: BoardMenuProps) {
  const { createdAt, _id, description: desc } = useAppSelector(getCurrentBoard) || {}
  const updateBoard = useUpdateBoard()
  const [description, setDescription] = useState('');
  const [editDesc, setEditDesc] = useState(false);
  



  function handleDescription() {
    const boardUpdate = { description }
    if (_id) updateBoard(_id, boardUpdate)

    setEditDesc(false)
  }
  
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
          <>
            <textarea onChange={(e) => setDescription(e.target.value)} className="description" defaultValue={desc} >
            </textarea>
            <p className="resize">* You can resize the height of the text box on its bottom right corner.</p>
            <div className="submit">
              <button onClick={() => handleDescription()} className="btn-pad btn-main">Save</button>
              <button onClick={() => setEditDesc(false)}>Cancel</button>
            </div>
          </>
          :
          <div className="description">
            {desc}
          </div>
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
            <div>
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
  textarea{
    border: 1px solid var(--gray);
    height: 200px;
    padding: 10px;
    border-radius: 8px;
    outline-color: var(--mainColor);
  }
  .resize{
    font-size: 10px;
    color: var(--gray);
    width: 300px;
  }
  .submit{
    display: flex;
    gap: 12px;
    font-size: 12px;
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
