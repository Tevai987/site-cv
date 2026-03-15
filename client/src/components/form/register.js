import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/users/usersSlices.js";
import "./styleSheet/register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = new FormData(e.target);

    fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: newUser.get("name"),
        email: newUser.get("email"),
        password: newUser.get("password"),
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const name = data.user.name;
        const email = data.user.email;
        const password = data.user.password;

        dispatch(addUser({ name, email, password }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Register</h2>
          <input type="text" name="name" placeholder="Name"></input>
          <input type="text" name="email" placeholder="Email"></input>
          <input type="password" name="password" placeholder="Password"></input>

          <input type="submit" defaultValue="Register" />
        </div>
      </form>
    </>
  );
};
