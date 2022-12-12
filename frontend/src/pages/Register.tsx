import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Logo from "../components/Logo";
import { FormEvent, useState } from "react";
import axios from "../api/axios";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { TbEye, TbEyeOff, } from "react-icons/tb";


export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState('');
  const [matchErr, setMatchErr] = useState('');
  const [showpwd, setShowpwd] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formValues = e.target as any as Record<
      "firstname" | "lastname" | "email" | "password" | "confirm",
      {
        value: string;
      }
    >;
    const firstname = formValues.firstname.value;
    const lastname = formValues.lastname.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    const confirm = formValues.confirm.value;

    try {
      if (password !== confirm) {
        setMatchErr('Password does not match')
        return false
      } else setMatchErr('')

      const response = await axios.post('/auth/register',
        JSON.stringify({ fullname: `${firstname} ${lastname}`, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      dispatch(setCredentials(accessToken));
      navigate('/boards');
    } catch (err: AxiosError | any) {
      console.log('error', err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message);
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <Div className="center-div">
      <div className="logo mt-150">
        <Link to='/'><Logo /></Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
        <h1>Register</h1>

        {errMsg && <div className="error">{errMsg}</div>}

        <label className="form-control">
          <FaUser />
          <input type="text" name="firstname" autoComplete="off" required minLength={2} placeholder="First Name" />
        </label>
        <label className="form-control">
          <FaUser />
          <input type="text" name="lastname" autoComplete="off" required minLength={2} placeholder="Last Name" />
        </label>
        <label className="form-control">
          <FaEnvelope />
          <input type="email" name="email" autoComplete="off" required placeholder="Email" />
        </label>
        <label className="form-control confirm">
          <FaLock />
          <input type={showpwd ? 'text' : 'password'} name="password" required placeholder="Password" />
          <span onClick={()=> setShowpwd(!showpwd)}>
            {showpwd ? <TbEye /> : <TbEyeOff />}
          </span>
        </label>
        <label className="form-control">
          <FaLock />
          <input type={showpwd ? 'text' : 'password'} name="confirm" required placeholder="Confirm Password" />
        </label>
        <div className="error">{matchErr}</div>

        <div>
          <button type="submit" className="btn btn-main">Register</button>
        </div>

        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </Div>
  )
}


const Div = styled.div`
  .mt-150{
    margin-top: 150px;
  }
`
