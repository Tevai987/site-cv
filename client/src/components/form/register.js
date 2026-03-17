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
      <section className="container">
        <section>
          <form onSubmit={handleSubmit} className="boxForm">
            <div>
              <h1>Formulaire d'inscription.</h1>
            </div>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input-button"
              ></input>
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input-button"
              ></input>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-button"
              ></input>
            </div>
            <div>
              <input
                type="submit"
                defaultValue="Submit"
                className="submit-button"
              />
            </div>
          </form>
        </section>
      </section>
    </>
  );
};
