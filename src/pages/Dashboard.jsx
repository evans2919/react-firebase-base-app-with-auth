import { logout } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import usePageTitle from "../hooks/usePageTitle";

const Dashboard = () => {
  usePageTitle();
  const { user } = useUserContext();
  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Dashboard</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
