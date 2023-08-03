import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { login } from "../config/firebase";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";

const Login = () => {
  usePageTitle();
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login({ email, password });
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/register">
        <button>Register</button>
      </Link>
    </>
  );
};

export default Login;
