import { useState, useRef } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";
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

  
  return (
    <>
      <Div >
        <div className="list-title">
          <span>{list.title}</span>
          <TbDots />
        </div>
        {[1].map(i => (
          <Card key={i} />
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
            <NewCardForm listId={list._id} setShowCardFormModal={setShowCardFormModal} ref={cardFormRef} />
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
