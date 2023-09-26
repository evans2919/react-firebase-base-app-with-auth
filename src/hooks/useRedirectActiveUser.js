import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectActiveUser = (user, path) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate(path);
        }
    }, [user]);
};

export default useRedirectActiveUser;
