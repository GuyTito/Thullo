import { AxiosError } from "axios";
import { useState, useRef, } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";
import interceptedAxiosPrivate from "../hooks/interceptedAxiosPrivate";
import { getCardsByListId } from "../store/cardSlice";
import { useAppDispatch, useAppSelector, } from "../store/hooks";
import { deleteStoreList, ListType } from "../store/listSlice";
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
  const [renameTitle, setRenameTitle] = useState(false)
  const axiosPrivate = interceptedAxiosPrivate()
  const dispatch = useAppDispatch()
  const [listTitle, setListTitle] = useState(list.title);



  async function deleteList(){
    if (list._id){
      try{
        const response = await axiosPrivate.delete('/lists', { data: { _id: list._id} })
        if (response.data?.deletedList){
          dispatch(deleteStoreList(list._id))
          setShowListMenu(false)
        }
      } catch (error: AxiosError | any) {
        if (!error?.response) { // if error is not sent thru axios
          console.log('No Server Response');
        } else {
          console.log(error.response.data.message)
        }
      }
    }
  }

  async function updateListTitle(){
    alert('updated')
    setRenameTitle(false)
  }

  
  return (
    <>
      <Div >
        <div className="list-header">
          {renameTitle ? 
            <form onSubmit={updateListTitle}>
              <input onChange={(e) => setListTitle(e.target.value)} value={listTitle} type="text" autoFocus /> 
              <button type="button" onClick={() => setRenameTitle(false) }><MdOutlineClose /></button>
              <button type="submit"><BsCheck2 /></button>
            </form>
          :
            <span>{list.title}</span>
          }
          
          <ClickAwayListener onClickAway={() => { setShowListMenu(false); setIsDelete(false) }}>
            <Dropdown open={showListMenu} ref={listRef}
              button={
                <button onClick={() => setShowListMenu(!showListMenu)} className=''>
                  <TbDots />
                </button>
              }
              content={ 
                <div className="list-menu">
                  <button onClick={() => { setRenameTitle(true); setShowListMenu(false) }}>Rename</button>
                  <hr />
                  <div className="delete-list">
                    {isDelete && <button type="button" className="btn-square btn-gray" onClick={() => { setShowListMenu(false); setIsDelete(false) }}
                    >
                      <MdOutlineClose />
                    </button>}
  
                    <button onClick={()=>setIsDelete(!isDelete)} className="">Delete this list</button>
  
                    {isDelete && <button className="btn-square btn-gray" onClick={deleteList}><BsCheck2 /></button>}
                  </div>
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
    font-size: 14px;
    form{
      display: flex;
      align-items: center;
      gap: 5px;
      input{
        background-color: transparent;
        outline-color: var(--gray);
        padding-left: 5px;
      }

    }
    .list-menu{
      width: max-content;
      color: hsla(0, 0%, 51%, 1);
      hr{
        margin: 10px 0;
        border-top: 1px solid var(--gray);
      }
      .delete-list{
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }
  }
`
