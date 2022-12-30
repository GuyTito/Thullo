import { ReactNode, forwardRef, } from "react";
import styled from "styled-components";


interface DropdownProps {
  button: ReactNode
  content: ReactNode
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { button, content } = props

  
  return (
    <Div ref={ref}>
      {button}
      <div className="dropdown-outer">
        {content}
      </div>
    </Div>
  )
})


const Div = styled.div`
  position: relative;
  .dropdown-outer{
    padding-top: 10px;
    position: absolute;
    width: 160px;
    z-index: 9999;

    div{
      padding: 15px 12px;
      background: var(--white);
      border: 1px solid #E0E0E0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
    }
  }
`

export default Dropdown