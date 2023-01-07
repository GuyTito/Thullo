import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import styled from "styled-components";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { getCurrentBoard } from "../store/boardSlice";
import { useAppSelector } from "../store/hooks";
import { Dispatch } from 'react'


interface VisibilityMenuProps{
  setOpen: Dispatch<React.SetStateAction<boolean>>
}


export default function VisibilityMenu({ setOpen }: VisibilityMenuProps) {
  const {privacy, _id} = useAppSelector(getCurrentBoard) || {}
  const updateBoard = useUpdateBoard()


  function handlePrivacy(privacy: boolean) {
    setOpen(false)

    const boardUpdate = { privacy }
    if (_id) updateBoard(_id, boardUpdate)
  }
  
  return (
    <Div>
      <div className="menu-head">
        <h4>Visibility</h4>
        <span>Choose who can see to this board.</span>
      </div>
      <div onClick={() => handlePrivacy(false)} className={`menu-item ${!privacy && 'selected'}`}>
        <h5><BiWorld /> Public</h5>
        <span>Anyone on the internet can see this</span>
      </div>
      <div onClick={() => handlePrivacy(true)} className={`menu-item ${privacy && 'selected'}`}>
        <h5><FaLock /> Private</h5>
        <span>Only board members can see this</span>
      </div>
    </Div>
  )
}


const Div = styled.div`
  div:not(:last-of-type){
    margin-bottom: 15px;
  }
  .menu-head{
    h4{
      font-weight: 600;
    }
    span{
      font-size: 12px;
      color: var(--gray);
    }
  }
  .menu-item{
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    h5{
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }
    span{
      font-size: 10px;
      color: var(--gray);
    }
    &:hover{

    }
  }
  .selected{
    background-color: var(--lightGray);
  }
`
