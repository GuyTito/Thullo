import { getCurrentBoard } from "../store/boardSlice";
import { useAppSelector } from "../store/hooks";
import useCurrentUser from "./useCurrentUser";


const useAuthority = () => {
  const { userId } = useCurrentUser();
  const { userId: boardUserId } = useAppSelector(getCurrentBoard) || {}

  return userId === boardUserId;
};

export default useAuthority;