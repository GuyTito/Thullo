import styled from "styled-components";
import useCurrentUser from "../hooks/useCurrentUser";


export default function UserProfile() {
  const {fullname} = useCurrentUser();
  
  return (
    <Div>
      {fullname}
    </Div>
  )
}


const Div = styled.div`
  
`
