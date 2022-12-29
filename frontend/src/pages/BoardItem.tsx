import { FaLock } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { TfiClip } from "react-icons/tfi";
import styled from "styled-components";
import Avatar from "../components/Avatar";


export default function BoardItem() {
  
  
  return (
    <Div>
      <div className="topbar">
        <div className="left">
          <button className="btn-pad btn-gray"><FaLock /> Private</button>
          <div className="avatars">
            {[1, 2, 3].map(i => (
              <Avatar key={i} />
            ))}
            <button className="btn-main btn-square">+</button>
          </div>
        </div>
        <button className="btn-pad btn-gray"><TbDots /> Show Menu</button>
      </div>
      <div className="lists">
        {[1,2,3].map(list => (
          <div className="list">
            <div className="list-title">
              <span>Backlog 🤔</span>
              <TbDots />
            </div>
            {[1,2].map(card => (
              <div className="card">
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
