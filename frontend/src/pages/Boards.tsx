import styled from "styled-components";
import Avatar from "../components/Avatar";
import Modal from "../components/Modal";
import { useEffect, useState } from 'react';
import NewBoardForm from "../components/NewBoardForm";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getBoards, loadBoards } from "../store/boardSlice";
import { lg, sm } from "../hooks/devices";
import { Link } from "react-router-dom";



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const axiosPrivate = interceptedAxiosPrivate()
  const [errMsg, setErrMsg] = useState('')
  const dispatch = useAppDispatch();
  const boards = useAppSelector(getBoards)



  useEffect(()=>{
    async function fetchBoards(){
      try {
        const response = await axiosPrivate.get('/boards')
        if (response) {
          const boards = response?.data
          console.log('boards', boards)
          dispatch(loadBoards(boards))
        }
      } catch (error: AxiosError | any) {
        console.log('board error', error.message, error.response.data.message)
        if (!error?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg(error.response.data.message);
        }
      }
    }
    fetchBoards()
  }, [])
  
  return (
    <>
      <Main>
        <div className="all-boards">
          <h1>All Boards</h1>
          <button onClick={()=>setShowModal(true)} className="btn-main btn-pad">+ Add</button>
        </div>

        <div className="boards">
          {boards.map(board => (
            <Link to={board._id} key={board._id} className="card">
              {board.coverImgUrl && 
                <div className="cover">
                  <img src={board.coverImgUrl} alt={board.title} />
                </div>
              }
              <span>{board.title}</span>
              <div className="avatars">
                {[1,2,3].map(i => (
                  <Avatar key={i} />
                ))}
                <span>+5 others</span>
              </div>
            </Link>
          ))}
        </div>
      </Main>

      {/* modal */}
      {showModal && 
        <Modal setShowModal={setShowModal}>
          <NewBoardForm setShowModal={setShowModal} />
        </Modal>
      }
    </>
  )
}

const Main = styled.main`
  max-width: 1080px;
  margin: auto;

  .all-boards{
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
    }

  }

  .boards{
    margin-top: 40px;
    display: grid;
    gap: 36px;
    justify-content: center;
    
    @media ${sm} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    @media ${lg} {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .card{
      width:243px;
      background: var(--white);
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      padding: 12px;

      .cover{
        width: 220px;
        height: 130px;
        border-radius: 12px;
        overflow: hidden;
        background-color: var(--white);
        border-radius: 12px;
        margin-bottom: 12px;
      }

      span{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
      }

      .avatars{
        margin-top: 20px;
        display: flex;
        gap: 12px;
        align-items: center;

        span{
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: var(--gray);
        }
      }
    }

  }
  
`
