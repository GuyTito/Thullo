import styled from "styled-components";
import { ReactNode, Dispatch } from 'react';

interface ModalProps{
  children: ReactNode
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}


export default function Modal(props: ModalProps) {
  const { children, setShowModal } = props
  
  return (
    <Div onClick={() => setShowModal(false)}>
      <div onClick={(e)=>e.stopPropagation()} className="content">
        {children}
      </div>
    </Div>
  )
}


const Div = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    overflow: hidden;
  }
`
