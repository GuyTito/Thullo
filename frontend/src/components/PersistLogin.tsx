import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuth, getNewAccessToken } from "../store/authSlice";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true)
  const { accessToken, persist} = useAppSelector(getAuth);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    async function callGetNewAccessToken() {
      await dispatch(getNewAccessToken())
      setIsLoading(false)
    }

    !accessToken ? callGetNewAccessToken() : setIsLoading(false)
  }, [])
  
  return (
    <>
      {!persist 
        ? <Outlet /> 
        : isLoading 
            ? <div>Loading...</div> 
            : <Outlet />
      }
    </>
  )
}
