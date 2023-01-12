import { useState, FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";


export default function InviteUser() {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log('search Term', searchTerm)
    setSearchTerm('')
  }
  
  return (
    <Div>
      <h4>Invite user</h4>
      <p>Search users you want to invite to</p>
      <form onSubmit={(e)=>handleSubmit(e)} className="search">
        <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder='User...' />
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
    font-size: 13px;
    color: var(--gray);
  }
  .search{
    margin-top: 13px;
    display: flex;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 4px;

    input{
      outline: none;
    }
  }
`
