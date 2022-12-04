import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuth, getNewAccessToken } from "../store/authSlice";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true)
  const auth = useAppSelector(getAuth);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    async function callGetNewAccessToken() {
      await dispatch(getNewAccessToken())
      setIsLoading(false)
    }

    !auth.accessToken ? callGetNewAccessToken() : setIsLoading(false)
  }, [])
  
  return (
    <>
      { isLoading ? <div>Loading...</div> : <Outlet /> }
    </>
  )
}