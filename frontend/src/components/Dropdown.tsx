import { ReactNode, forwardRef, } from "react";
import styled from "styled-components";


interface DropdownProps {
  button: ReactNode
  content: ReactNode
  open: boolean
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { button, content, open } = props

  
  return (
    <Div ref={ref}>
      {button}
      
      {open &&
        <div className="dropdown-content">
          {content}
        </div>
      }
    </Div>
  )
})


const Div = styled.div`
  position: relative;
  .dropdown-content{
    position: absolute;
    width: max-content;
    z-index: 9999;
    padding: 15px 12px;
    margin-top: 10px;
    background: var(--white);
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
  }
`

export default Dropdown