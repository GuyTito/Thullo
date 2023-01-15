import { FaLock, } from "react-icons/fa";
import { MdComment, } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { TfiClip } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { useEffect, useState, useRef } from 'react';
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentBoard, setCurrentBoard } from "../store/boardSlice";
import Dropdown from "../components/Dropdown";
import ClickAwayListener from 'react-click-away-listener';
import { BiWorld } from "react-icons/bi";
import VisibilityMenu from "../components/VisibilityMenu";
import BoardMenu from "../components/BoardMenu";
import InviteUser from "../components/InviteUser";
import Modal from "../components/Modal";
import { getCurrentLists, loadLists } from "../store/listSlice";
import NewListForm from "../components/NewListForm";
import Card from "../components/Card";


export default function BoardItem() {
  const {id} = useParams()
  const axiosPrivate = interceptedAxiosPrivate()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentBoard = useAppSelector(getCurrentBoard)
  const [showVisiblityMenu, setShowVisiblityMenu] = useState(false);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const visibilityRef = useRef(null)
  const boardMenuRef = useRef(null)
  const inviteUserRef = useRef(null)
  const listFormRef = useRef(null)
  const currentLists = useAppSelector(getCurrentLists)


  async function getBoard(id: string) {
    try {
      const response = await axiosPrivate.get(`boards/${id}`)

      // handle specific error not handled by axios
      if (!response.data?.foundBoard) {
        navigate('*')
        throw new Error(`Board with id ${id} not found.`)
      } else {
        console.log('found board', response.data)
        dispatch(setCurrentBoard(response.data?.foundBoard))
        fetchLists(id)
      }
    } catch (error: AxiosError | any) {
      if (!error?.response) { // if error is not sent thru axios
        console.log(error.message)
      } else {
        navigate('*')
        console.log(error.response.data.message)
      }
    }
  }

  async function fetchLists(boardId: string) {
    try {
      const response = await axiosPrivate.get(`/boards/lists/${boardId}`)
      if (response) {
        const lists = response?.data
        console.log('lists', lists)
        dispatch(loadLists(lists))
      }
    } catch (error: AxiosError | any) {
      if (!error?.response) { // if error is not sent thru axios
        console.log(error.message)
      } else {
        console.log(error.response.data.message)
      }
    }
  }
    
  useEffect(()=>{
    if (id) getBoard(id)

    return ()=>{
      dispatch(setCurrentBoard(null))
    }
  }, [])



  
  return (
    <>
      <Div>
        <div className="topbar">
          <div className="left">
            <ClickAwayListener onClickAway={()=>setShowVisiblityMenu(false)}>
              <Dropdown open={showVisiblityMenu} ref={visibilityRef}
                button = {
                  <button onClick={() => setShowVisiblityMenu(!showVisiblityMenu)} className={`btn-pad ${currentBoard?.privacy ? 'btn-selected' : 'btn-gray'}`}>
                    {currentBoard?.privacy ? <><FaLock /> Private</> : <><BiWorld /> Public</>}
                  </button>
                }
                content={<VisibilityMenu setOpen={setShowVisiblityMenu} />}
              />
            </ClickAwayListener>
            <div className="avatars">
              {[1, 2, 3].map(i => (
                <Avatar key={i} />
              ))}
              <ClickAwayListener onClickAway={() => setShowInviteUser(false)}>
                <Dropdown open={showInviteUser} ref={inviteUserRef} 
                  button = {
                    <button onClick={() => setShowInviteUser(!showInviteUser)} className="btn-main btn-square">+</button>
                  }
                  content = {
                    <InviteUser />
                  }
                />
              </ClickAwayListener>
            </div>
          </div>
          
          <div className="right">
            <ClickAwayListener onClickAway={() => setShowBoardMenu(false)}>
              <Dropdown open={showBoardMenu} ref={boardMenuRef}
                button = {
                  <button onClick={() => setShowBoardMenu(!showBoardMenu)} className="btn-pad btn-gray"><TbDots /> Show Menu</button>
                }
                content={<BoardMenu setShowBoardMenu={setShowBoardMenu} />}
              />
            </ClickAwayListener>
          </div>
        </div>

        <div className="lists">
          {currentLists.map(list => (
            <div key={list._id} className="list">
              <div className="list-title">
                <span>{list.title}</span>
                <TbDots />
              </div>
              {[1].map(i => (
                <Card key={i} />
              ))}
              <div className="add-another">
                <button><span>Add card</span> <span>+</span></button>
              </div>
            </div>
          ))}
          <div className="add-another">
            <button onClick={() => setShowListModal(true)}><span>Add list</span> <span>+</span></button>
          </div>
        </div>
      </Div>

      {/* add list modal */}
      {showListModal &&
        <Modal>
          <ClickAwayListener onClickAway={() => setShowListModal(false)}>
            <NewListForm setShowListModal={setShowListModal} ref={listFormRef} />
          </ClickAwayListener>
        </Modal>
      }
    </>
  )
}


const Div = styled.div`
  background-color: var(--white);
  padding: 24px;
  .topbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      .avatars{
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
    }
    .right{
      .dropdown-content{
        right: 0;
        top: 0;
        margin-top: 0;
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
  .lists{
    background-color: var(--bgColor);
    margin-top: 24px;
    border-radius: 24px;
    padding: 24px;
    display: flex;
    gap: 32px;
    .list{
      width: 240px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .list-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          font-size: 14px;
        }
      }
      
      
    }
    .add-another{
      width: 240px;
      button{
        padding: 8px 13px;
        color: var(--mainColor);
        background: var(--lightBlue);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        font-size: 12px;
        width: 100%;
      }
    }
  }
`