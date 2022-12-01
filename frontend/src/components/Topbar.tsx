import styled from 'styled-components';
import Avatar from './Avatar';
import Logo from './Logo';


export default function Topbar() {
  
  
  return (
    <>
      <Header>
        <div className='brand'>
          <Logo />
          <span>Thullo</span>
        </div>

        <div className='search'>
          <input type="text" placeholder='keyword...' />
          <button className='btn'>Search</button>
        </div>

        <button className='profile'>
          <Avatar />
          <span>Kofi Sika</span>
          <span>&#9662;</span>
        </button>
      </Header>
    </>
  )
}

const Header = styled.header`
  display: flex;
  padding: 15px 24px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  background-color: var(--white);

  .brand{
    display: flex;
    gap: 10px;
    align-items: center;

    span{
      font-size: 18px;
      font-weight: 600;
      line-height: 27px;
    }
  }

  .search{
    padding-left: 12px;
    margin-left: auto;
    display: flex;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 4px;
    margin-right: 42px;

    input{
      padding-left: 13px;
      outline: none;

      /* &::placeholder{
        color: var(--gray);
      } */
    }
  }

  .profile{
    /* margin-left: auto; */
    display: flex;
    align-items: center;
    gap: 12px;

    span{
      font-weight: 700px;
    }
  }

`