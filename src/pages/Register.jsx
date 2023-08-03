import { useState } from "react";
import { register } from "../config/firebase";
import usePageTitle from "../hooks/usePageTitle";
import { useUserContext } from "../context/UserContext";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";

const Register = () => {
  usePageTitle();
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await register({ email, password });
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Register</h1>
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
        />{" "}
        <br /> <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <Link to="/">
        <button>Log in</button>
      </Link>
    </>
  );
};

export default Register;
