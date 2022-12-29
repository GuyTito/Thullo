import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';
import Logo from './Logo';
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import useCurrentUser from '../hooks/useCurrentUser';


export default function Topbar() {
  const dispatch = useAppDispatch();
  const {fullname} = useCurrentUser();

  return (
    <>
      <Header>
        <Link to='/' className='brand'>
          <Logo />
          <span>Thullo</span>
        </Link>

        <div className='search'>
          <input type="text" placeholder='keyword...' />
          <button className='btn btn-main'>Search</button>
        </div>

        <div className='dropdown'>
          <button className='profile'>
            <Avatar />
            <span>{fullname}</span>
            <span>&#9662;</span>
          </button>

          <div className='content'>
            <div>
              <Link to='/current-user' className='my-profile'><FaUser /> My Profile</Link>
              <hr />
              <Link onClick={()=>dispatch(logout())} to='/login' className='logout'><BiLogOut /> Logout</Link>
            </div>
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
  position: relative;
  z-index: 10;

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
      padding-top: 10px;
      display: none;
      position: absolute;
      right: 0;
      width: 160px;
      z-index: 9999;

      div{
        padding: 15px 12px;
        background: var(--white);
        border: 1px solid #E0E0E0;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        border-radius: 12px;

        a{
          display: flex;
          align-items: center;
          gap: 12px;

          &.my-profile {
            background-color: #F2F2F2;
            padding: 10px 13px;
            border-radius: 8px;
          }

          &.logout{
            padding: 0 13px;
            color: var(--error);
          }
        }

        hr{
          margin: 16px 0;
          border-top: 1px solid var(--gray);
        }
      }
    }

    &:hover{
      div{
        display: block;
      }
    }
  }

  

`