import { useDispatch } from "react-redux";
import { logUser } from "../../store/slices/users/logInSlices.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogIn = (e) => {
    e.preventDefault();

    const logInUser = new FormData(e.target);

    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: logInUser.get("email"),
        password: logInUser.get("password"),
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const email = data.user.email;
        const id = data.user.id;
        const name = data.user.name;
        const isActive = data.user.isActive;
        dispatch(logUser({ email, id, name, isActive }));
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleLogIn}>
        <h1>Formulaire de connexion</h1>
        <input type="text" name="email" placeholder="Email"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <input type="submit" defaultValue="Connexion"></input>
      </form>
    </>
  );
};
