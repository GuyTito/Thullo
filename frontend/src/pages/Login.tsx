import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../components/Logo";


export default function Login() {
  
  
  return (
    <Div>
      <div className="logo"><Logo /></div>

      <form>
        <h1>Login</h1>

        <label>
          <FaEnvelope />
          <input type="email" autoComplete="false" placeholder="Email" />
        </label>
        <label>
          <FaLock />
          <input type="password" placeholder="Password" />
        </label>
        <div>
          <button type="submit" className="btn">Login</button>
        </div>

        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </form>
    </Div>
  )
}


const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;

  .logo{
    margin-bottom: 20px;
  }

  form{
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
      }
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
`
