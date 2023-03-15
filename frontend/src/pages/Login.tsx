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
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('123');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/boards";

  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault()

    try {
      const response = await axios.post('/auth/login',
        JSON.stringify({ email, password }));
      const accessToken = response?.data?.accessToken;
      dispatch(setCredentials(accessToken));
      navigate(from, { replace: true });
    } catch (err: AxiosError | any) {
      setIsLoading(false)
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
          <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} autoComplete="off" placeholder="Email" autoFocus />
        </label>
        <label className="form-control">
          <FaLock />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        </label>
        
        <div>
          <button type="submit" className="btn-pad btn-main">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
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
