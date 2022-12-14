import { getAuth } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";
import jwt_decode from "jwt-decode";

interface DecodedType {
  UserInfo: {
    userId: string
    fullname: string
    email: string
  }
}

export default function useCurrentUser(){
  const auth = useAppSelector(getAuth);

  const decoded: DecodedType | null = auth?.accessToken ? jwt_decode(auth?.accessToken) : null;

  const fullname = decoded?.UserInfo?.fullname;
  const email = decoded?.UserInfo?.email;
  const userId = decoded?.UserInfo?.userId;

  return { fullname, email, userId }
}