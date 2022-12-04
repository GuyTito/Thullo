import Topbar from "./Topbar";
import { Outlet } from 'react-router-dom';
import { useAppSelector } from "../store/hooks";
import { getAuth } from "../store/authSlice";


export default function Layout() {
  const auth = useAppSelector(getAuth);

  
  return (
    <>
      {auth.accessToken && <Topbar />}

      <Outlet />
    </>
  )
}