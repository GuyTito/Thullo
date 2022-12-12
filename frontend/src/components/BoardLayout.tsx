import Topbar from "./Topbar";
import { Outlet } from 'react-router-dom';


export default function BoardLayout() {

  
  return (
    <>
      <Topbar />

      <Outlet />
    </>
  )
}