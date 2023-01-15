import { TbDots } from "react-icons/tb";
import styled from "styled-components";
import { ListType } from "../store/listSlice";
import Card from "./Card";


interface ListProps{
  list: ListType
}

export default function List(props: ListProps) {
  const { list } = props
  
  return (
    <Div >
      <div className="list-title">
        <span>{list.title}</span>
        <TbDots />
      </div>
      {[1].map(i => (
        <Card key={i} />
      ))}
      <div className="add-another">
        <button><span>Add card</span> <span>+</span></button>
      </div>
    </Div>
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
