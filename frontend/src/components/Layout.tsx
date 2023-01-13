import { Outlet } from "react-router-dom";
import styled from "styled-components";


export default function Layout() {
  
  
  return (
    <Div>
      <Outlet />
    </Div>
  )
}


const Div = styled.div`
  .center-div{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;

    .logo{
      margin-bottom: 20px;
    }
  

    .auth-form{
      padding: 0 58px;
      border-radius: 24px;
      border: 1px solid var(--gray);
      width: 473px;
      display: flex;
      flex-direction: column;
      gap: 14px;

      h1{
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin: 20px 0;
      }

      label{
        &.confirm{
          input{
            width: 100%;
          }

          span{
            cursor: pointer;
            svg{
              color: black;
            }
          }
        }
      }

      .trust{
        display: flex;
        align-items: center;
        gap: 13px;
        font-size: 14px;
      }

      button{
        width: 100%;
      }

      p {
        font-size: 14px;
        line-height: 19px;
        margin-bottom: 43px;
        text-align: center;
        color: var(--gray);

        a{
          color: var(--mainColor);
        }
      }
    }
  }

  .form-control{
    border-radius: 8px;
    width: 356px;
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 13px;
    border: 1px solid var(--gray);

    svg{
      color: var(--gray);
    }

    input{
      background-color: transparent;
      outline: none;
      width: 100%;
    }
  }
`
