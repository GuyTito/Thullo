import ClickAwayListener from "react-click-away-listener";
import { MdComment } from "react-icons/md";
import { TfiClip } from "react-icons/tfi";
import styled from "styled-components";
import { CardType, } from "../store/cardSlice";
import Avatar from "./Avatar";
import CardItem from "./CardItem";
import Modal from "./Modal";
import { useRef, useState } from "react"
import { useAppDispatch } from "../store/hooks";


interface CardProps{
  card: CardType
}

export default function Card(props: CardProps) {
  const { card } = props
  const [showCardItemModal, setShowCardItemModal] = useState(false)
  const cardItemRef = useRef(null)
  const dispatch = useAppDispatch()

  function openCard(){
    // dispatch(setCurrentCard(card))
    
    setShowCardItemModal(true)
  }
  
  return (
    <>
      <Div onClick={openCard}>
        {card.coverImgUrl && <div className="cover">
          <img draggable="false" src={card.coverImgUrl} alt="" />
        </div>}
        <div className="card-title">{card?.title}</div>
        {/* <div className="labels">
          <label className="label">Technical</label>
        </div> */}
        {/* <div className="bottom">
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
        </div> */}
      </Div>


      {/* modal */}
      {showCardItemModal &&
        <Modal>
          <ClickAwayListener onClickAway={() => setShowCardItemModal(false)}>
            <CardItem setShowCardItemModal={setShowCardItemModal}
              ref={cardItemRef} cardId={card._id}
            />
          </ClickAwayListener>
        </Modal>
      }
    </>
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
  cursor: pointer;
  .cover{
    overflow: hidden;
    height: 130px;
    width: 100%;
    border-radius: 12px;
    img{
      object-fit: cover;
    }
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
