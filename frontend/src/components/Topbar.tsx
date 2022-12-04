import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';
import Logo from './Logo';
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";


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

        <div className='dropdown'>
          <button className='profile'>
            <Avatar />
            <span>Kofi Sika</span>
            <span>&#9662;</span>
          </button>

          <div className='content'>
            <ul>
              <li><FaUser /> <Link to='/users/id'>My Profile</Link></li>
              <hr />
              <li><BiLogOut /> Logout</li>
            </ul>
          </div>
        </div>
      </Header>
    </>
  )
}

const Header = styled.header`
  display: flex;
  padding: 15px 24px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  background-color: var(--white);
  align-items: center;

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

  .dropdown{
    position: relative;
    
    .profile{
      display: flex;
      align-items: center;
      gap: 12px;

      span{
        font-weight: 700;
      }
    }

    .content{
      display: block;
      left: 0;
      padding: 15px 12px;
      position: absolute;
      top: 100%;
      z-index: 9999;
      background: var(--white);
      border: 1px solid #E0E0E0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      border-radius: 12px;

    }

    &:hover{
      div{
        display: block;
      }
    }
  }

  

`