import { MdComment } from "react-icons/md";
import { TfiClip } from "react-icons/tfi";
import styled from "styled-components";
import { CardType } from "../store/cardSlice";
import Avatar from "./Avatar";


interface CardProps{
  card: CardType
}

export default function Card(props: CardProps) {
  const { card } = props
  
  return (
    <Div>
      <div className="cover">
        <img src={card.coverImgUrl} alt="" />
      </div>
      <div className="card-title">{card?.title}</div>
      <div className="labels">
        {/* <label className="label">Technical</label> */}
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
    </Div>
  )
}


const Div = styled.div`
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
`
