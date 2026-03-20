import { Link } from "react-router-dom";

export const log = () => {
  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/logIn">Login</Link>
      <Link to="/home">Home</Link>
    </>
  );
};
