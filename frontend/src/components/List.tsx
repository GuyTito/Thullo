import { AxiosError } from "axios";
import { useState, useRef, useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { CardType } from "../store/cardSlice";
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
  const axiosPrivate = interceptedAxiosPrivate()
  const [cards, setCards] = useState<CardType[]>([])

  async function fetchCards(listId: string) {
    try {
      const response = await axiosPrivate.get(`/cards/${listId}`)
      if (response) {
        setCards(response?.data)
        console.log('cards', cards)
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
    fetchCards(list._id) 
  }, [])

  function addToCards(card: CardType){
    setCards(prevState => [...prevState, card])
  }

  
  return (
    <>
      <Div >
        <div className="list-title">
          <span>{list.title}</span>
          <TbDots />
        </div>
        {cards.length > 0 && cards.map(card => (
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
              ref={cardFormRef} addToCards={addToCards}
            />
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
