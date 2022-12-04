import { Link } from "react-router-dom";
import styled from "styled-components";


export default function LandingPage() {
  
  
  return (
    <Div>
      <h1>Thullo. The best project management tool.</h1>
      <Link to='boards'>Enter your workspace</Link>
    </Div>
  )
}


const Div = styled.div`
  h1{
    font-weight: 700;
    font-size: 70px;
  }
`
