import { FaLock, } from "react-icons/fa";
import { TbDots } from "react-icons/tb";
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
import { getLists, loadLists } from "../store/listSlice";
import NewListForm from "../components/NewListForm";
import List from "../components/List";
import { loadCards } from "../store/cardSlice";


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
  const currentLists = useAppSelector(getLists)
  const [boardCreator, setBoardCreator] = useState('')


  async function getBoard(id: string) {
    try {
      const response = await axiosPrivate.get(`boards/${id}`)

      // handle specific error not handled by axios
      if (!response.data?.foundBoard) {
        navigate('*')
        throw new Error(`Board with id ${id} not found.`)
      } else {
        const foundBoard = response.data?.foundBoard
        dispatch(setCurrentBoard(foundBoard))
        fetchLists(id)
        fetchCards(id)
        getBoardCreator(foundBoard.userId)
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
      const response = await axiosPrivate.get(`/lists/${boardId}`)
      if (response) {
        const lists = response?.data
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

  async function fetchCards(boardId: string) {
    try {
      const response = await axiosPrivate.get(`/cards/${boardId}`)
      if (response) {
        dispatch(loadCards(response?.data))
      }
    } catch (error: AxiosError | any) {
      if (!error?.response) { // if error is not sent thru axios
        console.log(error.message)
      } else {
        console.log(error.response.data.message)
      }
    }
  }

  async function getBoardCreator(id: string) {
    try {
      const response = await axiosPrivate.get(`users/${id}`)

      // handle specific error not handled by axios
      if (!response.data?.foundUser) {
        throw new Error(`User with id ${id} not found.`)
      } else {

        setBoardCreator(response.data?.foundUser?.fullname)
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
                content={<BoardMenu setShowBoardMenu={setShowBoardMenu} boardCreator={boardCreator} />}
              />
            </ClickAwayListener>
          </div>
        </div>

        <div className="lists">
          {currentLists.map(list => (
            <List key={list._id} list={list} />
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