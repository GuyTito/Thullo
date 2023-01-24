import { Dispatch, forwardRef } from "react";
import styled from "styled-components";


interface CardItemProps {
  setShowCardItemModal: Dispatch<React.SetStateAction<boolean>>
}


export const CardItem = forwardRef<HTMLDivElement, CardItemProps>((props, ref) => {
  const { setShowCardItemModal } = props
  
  return (
    <Div ref={ref}>
      current card
    </Div>
  )
})


const Div = styled.div`
  
`

export default CardItem