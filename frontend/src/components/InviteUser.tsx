import { BiSearch } from "react-icons/bi";
import styled from "styled-components";


export default function InviteUser() {
  
  
  return (
    <Div>
      <h4>Invite user</h4>
      <p>Search users you want to invite to</p>
      <form className="search">
        <input type="text" placeholder='User...' />
        <button className='btn-main btn-square'><BiSearch /></button>
      </form>
    </Div>
  )
}


const Div = styled.div`
  h4{
    font-weight: 600;
  }
  p{
    /* font-size: 12px; */
    color: var(--gray);
  }
  .search{
    margin-top: 13px;
    padding-left: 12px;
    display: flex;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 4px;

    input{
      padding-left: 13px;
      outline: none;

      /* &::placeholder{
        color: var(--gray);
      } */
    }
  }
`
