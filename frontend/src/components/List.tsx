import { useState, useRef, } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";
import { getCardsByListId } from "../store/cardSlice";
import { useAppSelector, } from "../store/hooks";
import { ListType } from "../store/listSlice";
import Card from "./Card";
import Dropdown from "./Dropdown";
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
  const [showListMenu, setShowListMenu] = useState(false)
  const listRef = useRef(null)
  const [isDelete, setIsDelete] = useState(false)

  async function deleteList(){
    alert('deleted')
  }

  
  return (
    <>
      <Div >
        <div className="list-header">
          <span>{list.title}</span>
          
          <ClickAwayListener onClickAway={() => { setShowListMenu(false); setIsDelete(false) }}>
            <Dropdown open={showListMenu} ref={listRef}
              button={
                <button onClick={() => setShowListMenu(!showListMenu)} className=''>
                  <TbDots />
                </button>
              }
              content={ 
                <div className="list-menu">
                  {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => { setShowListMenu(false); setIsDelete(false) }}
                  >
                    <MdOutlineClose />
                  </button>}

                  <button onClick={()=>setIsDelete(!isDelete)} className="btn-pad btn-gray">Delete</button>

                  {isDelete && <button className="btn-square btn-gray" onClick={deleteList}><BsCheck2 /></button>}
                </div>
              }
            />
          </ClickAwayListener>
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
  .list-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      font-size: 14px;
    }
    .list-menu{
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }
`
