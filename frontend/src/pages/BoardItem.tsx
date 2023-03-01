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
import BoardMenu from "../components/BoardMenu";
import InviteUser from "../components/InviteUser";
import Modal from "../components/Modal";
import { getLists, loadLists } from "../store/listSlice";
import NewListForm from "../components/NewListForm";
import List from "../components/List";
import { loadCards } from "../store/cardSlice";
import useAuthority from "../hooks/useAuthority";
import useUpdateBoard from "../hooks/useUpdateBoard";
import { MdEdit, MdOutlineClose } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { lsm } from "../hooks/devices";


export default function BoardItem() {
  const {id} = useParams()
  const axiosPrivate = interceptedAxiosPrivate()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {title} = useAppSelector(getCurrentBoard) || {}
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const boardMenuRef = useRef(null)
  const inviteUserRef = useRef(null)
  const listFormRef = useRef(null)
  const currentLists = useAppSelector(getLists)
  const [boardCreator, setBoardCreator] = useState('')
  const isAuthorized = useAuthority();
  const [renameTitle, setRenameTitle] = useState(false)
  const [boardTitle, setBoardTitle] = useState(title);
  const updateBoard = useUpdateBoard()
  


  async function getBoard(id: string) {
    dispatch(loadLists([]))
    dispatch(loadCards([]))
    
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

  function updateBoardTitle() {
    const boardUpdate = { title: boardTitle }
    if (id) updateBoard(id, boardUpdate)
    setRenameTitle(false)
  }

  useEffect(() => {
    setBoardTitle(title)
  }, [renameTitle])

  
  return (
    <>
      <Div>
        <div className="topbar">
          <div className="left">
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
            
            {/* <div className="avatars">
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
            </div> */}
          </div>
          
          <div className="right">
            <ClickAwayListener onClickAway={() => setShowBoardMenu(false)}>
              <Dropdown open={showBoardMenu} ref={boardMenuRef}
                button = {
                  <button onClick={() => setShowBoardMenu(!showBoardMenu)} className="btn-pad btn-gray"><TbDots /> <span>Menu</span></button>
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
          {isAuthorized && <div className="add-another">
            <button onClick={() => setShowListModal(true)}><span>Add list</span> <span>+</span></button>
          </div>}
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
    .right{
      .btn-pad{
        span{
          @media ${lsm}{
            display: none;
          }
        }
      }
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
    overflow-y: scroll;
    
    .add-another{
      min-width: 240px;
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