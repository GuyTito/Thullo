import { Link } from "react-router-dom";
import styled from "styled-components";


export default function ErrorPage() {
  
  
  return (
    <Div>
      404 Not found. ☹
      <Link to='/'>Go back home</Link>
    </Div>
  )
}


const Div = styled.div`
  
`
