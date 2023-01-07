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
              content={<VisibilityMenu setOpen={setOpen} />}
            />
          </ClickAwayListener>
          <div className="avatars">
            {[1, 2, 3].map(i => (
              <Avatar key={i} />
            ))}
            <button className="btn-main btn-square">+</button>
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
