import styled from "styled-components"

export default function Logo() {
  
  
  return (
    <>
      <Div>
        <div></div>
        <div></div>
      </Div>
    </>
  )
}

const Div = styled.div`
  display: flex;
  gap: 5px;
  height: 30px;

  div{
    width: 14px;
    background-color: var(--mainColor);
    border-radius: 3px;

    &:nth-child(2){
      height: 17px;
    }
  }
`