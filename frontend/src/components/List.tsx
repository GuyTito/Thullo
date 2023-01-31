import { useState, useRef, } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";
import { getCardsByListId } from "../store/cardSlice";
import { useAppSelector, } from "../store/hooks";
import { ListType } from "../store/listSlice";
import Card from "./Card";
import Modal from "./Modal";
import NewCardForm from "./NewCardForm";


interface ListProps{
  list: ListType
}


export default function List(props: ListProps) {
  const { list } = props
  const [showCardFormModal, setShowCardFormModal] = useState(false)
  const cardFormRef = useRef(null)
  const cards = useAppSelector((state) => getCardsByListId(state, list._id))

  
  return (
    <>
      <Div >
        <div className="list-title">
          <span>{list.title}</span>
          <TbDots />
        </div>
        {cards?.length > 0 && cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
        <div className="add-another">
          <button onClick={() => setShowCardFormModal(true)}>
            <span>Add card</span> <span>+</span>
          </button>
        </div>
      </Div>

      {/* modal */}
      {showCardFormModal &&
        <Modal>
          <ClickAwayListener onClickAway={() => setShowCardFormModal(false)}>
            <NewCardForm listId={list._id} setShowCardFormModal={setShowCardFormModal} 
              ref={cardFormRef} />
          </ClickAwayListener>
        </Modal>
      }
    </>
  )
}


const Div = styled.div`
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
`
