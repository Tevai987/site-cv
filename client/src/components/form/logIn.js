import { useState } from "react";
import { useDispatch } from "react-redux";
import "./styleSheet/register.scss";
import { logUser } from "../../store/slices/users/logInSlices.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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

        if (data.user) {
          const email = data.user.email;
          const id = data.user.id;
          const name = data.user.name;
          const token = data.token;

          setErrorMessage("");
          dispatch(logUser({ email, id, name, token }));
          navigate("/home");
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const isUserNotFound = errorMessage.includes("Utilisateur non trouvé");
  return (
    <>
      {isUserNotFound ? (
        <>
          <section className="container">
            <section className="boxCreateAccount">
              <p style={{ color: "red" }}>{errorMessage}</p>
              <h1>Vous n'avez pas encore de compte ?</h1>

              <button
                className="connect-button"
                onClick={() => navigate("/register")}
              >
                Créer un compte
              </button>
            </section>
          </section>
        </>
      ) : (
        <section className="container">
          <section>
            <form onSubmit={handleLogIn} className="boxForm">
              <div>
                <h1>Formulaire de connexion</h1>
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input-button"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-button"
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Connexion"
                  className="submit-button"
                />
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </section>
        </section>
      )}
    </>
  );
};
