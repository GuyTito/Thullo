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
        JSON.stringify({ email, password }));
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
    <Div className="center-div">
      <div className="logo">
        <Link to='/'><Logo /></Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
        <h1>Login</h1>

        {errMsg && <div className="error">{errMsg}</div>}

        <label className="form-control">
          <FaEnvelope />
          <input type="email" name="email" autoComplete="off" placeholder="Email" autoFocus />
        </label>
        <label className="form-control">
          <FaLock />
          <input type="password" name="password" placeholder="Password" />
        </label>
        
        <div>
          <button type="submit" className="btn btn-main">Login</button>
        </div>

        <label className="trust">
          <input type="checkbox" onChange={() => dispatch(setPersist(!persist))} checked={persist} />
          Trust this device
        </label>

        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </form>
    </Div>
  )
}


const Div = styled.div`

`
