import styled from "styled-components";
import Avatar from "../components/Avatar";
import Modal from "../components/Modal";
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <Main>
        <div className="all-boards">
          <h1>All Boards</h1>
          <button onClick={()=>setShowModal(true)} className="btn btn-main">+ Add</button>
        </div>

        <div className="boards">
          {[1,2,3,4].map(i => (
            <div key={i} className="card">
              <div className="cover">
                {/* <img src="" alt="" /> */}
              </div>
              <span>Devchallenges Board</span>
              <div className="avatars">
                {[1,2,3].map(i => (
                  <Avatar key={i} />
                ))}
                <span>+5 others</span>
              </div>
            </div>
          ))}
        </div>
      </Main>

      {/* modal */}
      {showModal && <Modal setShowModal={setShowModal}>
        <ModalContent>
          <div className="cover">
            {/* <img src="" alt="" /> */}
          </div>
          <div className="form-control">
            <input type="text" placeholder="Add board title" />
          </div>
          <div>
            <button className="btn btn-gray">Cover</button>
            <button className="btn btn-gray">Private</button>
          </div>
          <div>
            <button>Cancel</button>
            <button className="btn btn-main">+ Create</button>
          </div>
        </ModalContent>
      </Modal>}
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
    grid-template-columns: repeat(4, minmax(0, 1fr)); 

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
        background-color: var(--gray);
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

const ModalContent = styled.div`
  padding: 24px;
  background-color: var(--white);

  div:not(:last-child){
    margin-bottom: 20px;
  }

  .cover{
    height: 78px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--gray);
  }
`