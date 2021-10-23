import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api/authentication-api";
import { SecurityContext } from "../context/security-context";

export const LoginPage = () => {
  const { onLogin } = React.useContext(SecurityContext);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const history = useHistory();

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    login(username, password).then((loggedUser) => {
      onLogin(loggedUser);
      history.push("/");
    });
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="login-form bg-light mt-4 p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            <h4>Sign in</h4>
            <div className="col-12">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-dark float-end">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
