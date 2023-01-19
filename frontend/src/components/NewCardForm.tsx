import { Dispatch, forwardRef } from "react";
import styled from "styled-components";


interface NewCardFormProps {
  setShowCardFormModal: Dispatch<React.SetStateAction<boolean>>
}


export const NewCardForm = forwardRef<HTMLFormElement, NewCardFormProps>((props, ref) => {
  const { setShowCardFormModal } = props
  
  return (
    <Form ref={ref}>
      card
    </Form>
  )
})


const Form = styled.form`
  
`

export default NewCardForm