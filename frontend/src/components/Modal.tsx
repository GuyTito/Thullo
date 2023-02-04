import styled from "styled-components";
import { ReactNode, useEffect } from 'react';

interface ModalProps{
  children: ReactNode
}


export default function Modal(props: ModalProps) {
  const { children } = props

  useEffect(()=>{
    document.body.style.overflowY = 'hidden'

    return ()=>{
      document.body.style.overflowY = ''
    }
  }, [])
  
  return (
    <Div >
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
