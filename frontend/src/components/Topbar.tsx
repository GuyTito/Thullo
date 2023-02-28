import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';
import Logo from './Logo';
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { useAppDispatch, } from '../store/hooks';
import { logout } from '../store/authSlice';
import useCurrentUser from '../hooks/useCurrentUser';
import Dropdown from './Dropdown';
import { useState, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { lsm } from '../hooks/devices';


export default function Topbar() {
  const dispatch = useAppDispatch();
  const {fullname} = useCurrentUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null)




  return (
    <>
      <Header>
        <Link to='/' className='brand'>
          <Logo />
          <span>Thullo</span>
        </Link>

        
        <Link to='/boards' className='btn-pad btn-gray'>
          <CgMenuGridR /> <span>All Boards</span>
        </Link>

        {/* <div className='search'>
          <input type="text" placeholder='keyword...' />
          <button className='btn-main btn-pad'>Search</button>
        </div> */}

        <div className='profile-div'>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Dropdown open={open} ref={ref}
              button = {
                <button onClick={() => setOpen(!open)} className='profile'>
                  {/* <Avatar /> */}
                  <span>{fullname}</span>
                  <span>&#9662;</span>
                </button>
              }
              content={
                <div className='dropdown-menu'>
                  <Link to='/current-user' className='my-profile'><FaUser /> My Profile</Link>
                  <hr />
                  <Link onClick={() => dispatch(logout())} to='/login' className='logout'><BiLogOut /> Logout</Link>
                </div>
              }
            />
          </ClickAwayListener>
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
  justify-content: space-between;

  .brand{
    display: flex;
    gap: 10px;
    align-items: center;

    span{
      font-size: 18px;
      font-weight: 600;
      line-height: 27px;

      @media ${lsm}{
        display: none;
      }
    }
  }

  .btn-pad{
    display: flex;
    align-items: center;
    gap: 5px;
    span{
      @media ${lsm}{
        display: none;
      }
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
    
  .profile-div{
    /* margin-left: auto; */
    .profile{
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: auto;

      span{
        font-weight: 700;
      }
    }
  }
  .dropdown-content{
    right: 0;
  }
  .dropdown-menu{
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
`