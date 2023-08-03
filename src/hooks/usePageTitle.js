import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation();
  const match = useMatch(location.pathname);

  useEffect(() => {
    const routeMapping = {
      "/": "App | Login",
      "/register": "App | Register",
      "/dashboard": "App | Dashboard",
    };  
    const defaultPageTitle = "Vite + React";
    const dynamicPageTitle = routeMapping[match?.pathname];
    document.title = dynamicPageTitle || defaultPageTitle;
  }, [match]);
};

export default usePageTitle;
