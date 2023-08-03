import { useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useRedirectActiveUser = (user, path) => {
//   const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(path);
    }
  }, [user]);
};

export default useRedirectActiveUser;
