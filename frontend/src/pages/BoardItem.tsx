import { FaLock, FaUserCircle } from "react-icons/fa";
import { MdComment, MdEdit, MdGroups, MdOutlineClose } from "react-icons/md";
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
import { IoDocumentText } from "react-icons/io5";



export default function BoardItem() {
  const {id} = useParams()
  const axiosPrivate = interceptedAxiosPrivate()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentBoard = useAppSelector(getCurrentBoard)
  const [open, setOpen] = useState(false);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const ref = useRef(null)
  const boardMenuRef = useRef(null)



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

  async function handlePrivacy(privacy: boolean){
    setOpen(false)

    const boardUpdate = { privacy }
    try {
      const response = await axiosPrivate.patch('/boards', { id, boardUpdate}, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.data?.updatedBoard) {
        throw new Error(`Board with id ${id} not found.`)
      } else {
        console.log('updated board', response.data)
        dispatch(setCurrentBoard(response.data?.updatedBoard))
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
    <Div>
      <div className="topbar">
        <div className="left">
          <ClickAwayListener onClickAway={()=>setOpen(false)}>
            <Dropdown open={open} ref={ref}
              button = {
                <button onClick={() => setOpen(!open)} className={`btn-pad ${currentBoard?.privacy ? 'btn-selected' : 'btn-gray'}`}>
                  {currentBoard?.privacy ? <><FaLock /> Private</> : <><BiWorld /> Public</>}
                </button>
              }
              content = {
                <div className="dropdown-menu">
                  <div className="menu-head">
                    <h4>Visibility</h4>
                    <span>Choose who can see to this board.</span>
                  </div>
                  <div onClick={() => handlePrivacy(false)} className={`menu-item ${!currentBoard?.privacy && 'selected'}`}>
                    <h5><BiWorld /> Public</h5>
                    <span>Anyone on the internet can see this</span>
                  </div>
                  <div onClick={() => handlePrivacy(true)} className={`menu-item ${currentBoard?.privacy && 'selected'}`}>
                    <h5><FaLock /> Private</h5>
                    <span>Only board members can see this</span>
                  </div>
                </div>
              }
            />
          </ClickAwayListener>
          <div className="avatars">
            {[1, 2, 3].map(i => (
              <Avatar key={i} />
            ))}
            <button className="btn-main btn-square">+</button>
          </div>
        </div>
        
        <ClickAwayListener onClickAway={()=>setOpen(false)}>
          <Dropdown open={showBoardMenu} ref={boardMenuRef}
            button = {
              <button onClick={() => setShowBoardMenu(!showBoardMenu)} className="btn-pad btn-gray"><TbDots /> Show Menu</button>
            }
            content = {
              <div className="board-menu">
                <div>
                  <h3>Menu</h3>
                  <MdOutlineClose />
                </div>
                <hr />
                <div>
                  <span><FaUserCircle /> Made by</span>
                </div>
                <div>
                  <Avatar /> 
                  <div>
                    <span>Daniel Akrofi</span>
                    <span>on {currentBoard?.createdAt}</span>
                  </div>
                </div>
                <div>
                  <span><IoDocumentText /> Description</span>
                  <button><MdEdit /> Edit</button>
                </div>
                <div>currentBoard?.description</div>
                <div><MdGroups /> Team</div>
                <div>
                  <div>
                    <Avatar />
                    <span>Daniel Akrofi</span>
                    <span>Admin</span>
                  </div>
                  {[1, 2].map(i => (
                    <div>
                      <Avatar />
                      <span>Bianca Soulsa</span>
                      <button>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </ClickAwayListener>
      </div>
      <div className="lists">
        {[1,2,].map(i => (
          <div key={i} className="list">
            <div className="list-title">
              <span>Backlog 🤔</span>
              <TbDots />
            </div>
            {[1,2].map(i => (
              <div key={i} className="card">
                <div className="cover">
                  {/* <img src="" alt="" /> */}
                </div>
                <div className="card-title">✋🏿 Move anything 'ready' here</div>
                <div className="labels">
                  <label className="label">Technical</label>
                </div>
                <div className="bottom">
                  <div className="left">
                    {[1, 2,].map(i => (
                      <Avatar key={i} />
                    ))}
                    <button className="btn-main btn-square">+</button>
                  </div>
                  <div className="right">
                    <span><MdComment />1</span>
                    <span><TfiClip /> 2</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="add-another">
              <button><span>Add card</span> <span>+</span></button>
            </div>
          </div>
        ))}
        <div className="add-another">
          <button><span>Add list</span> <span>+</span></button>
        </div>
      </div>
    </Div>
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
      .dropdown-menu{
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
      .card{
        width: 100%;
        border-radius: 12px;
        background-color: var(--white);
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        .cover{
          height: 130px;
          width: 100%;
          background-color: var(--gray);
          border-radius: 12px;
        }
        .labels{
          display: flex;
          gap: 12px;
          label{
            color: var(--mainColor);
            background-color: var(--lightBlue);
            border-radius: 8px;
            font-size: 10px;
            padding: 2px 6px;
          }
        }
        .bottom{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            gap: 12px;
            flex-direction: row;
            align-items: center;
          }
          .right{
            font-size: 10px;
            display: flex;
            gap: 12px;
            color: var(--gray);
            span{
              display: flex;
              gap: 3px;
              align-items: center;
            }
          }
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
