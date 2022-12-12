import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../components/Logo";
import { FormEvent, useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuth, setCredentials, setPersist } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export default function Login() {
  const { persist } = useAppSelector(getAuth);
  const [errMsg, setErrMsg] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/boards";

  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formValues = e.target as any as Record<
      "email" | "password",
      {
        value: string;
      }
    >;
    const email = formValues.email.value;
    const password = formValues.password.value;

    try {
      const response = await axios.post('/auth/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      dispatch(setCredentials(accessToken));
      navigate(from, { replace: true });
    } catch (err: AxiosError | any) {
      console.log('error', err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("persist", String(persist));
  }, [persist])
  
  return (
    <Div>
      <div className="logo">
        <Link to='/'><Logo /></Link>
      </div>

      <form onSubmit={(e)=> handleSubmit(e)}>
        <h1>Login</h1>

        {errMsg && <div className="error">{errMsg}</div>}

        <label className="form-control">
          <FaEnvelope />
          <input type="email" name="email" autoComplete="off" placeholder="Email" />
        </label>
        <label className="form-control">
          <FaLock />
          <input type="password" name="password" placeholder="Password" />
        </label>
        
        <div>
          <button type="submit" className="btn">Login</button>
        </div>

        <label className="remember">
          <input type="checkbox" onChange={() => dispatch(setPersist(!persist))} checked={persist} />
          Remember me
        </label>

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
      }
    }

    .remember{
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
`
