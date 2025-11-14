import { NavLink, useNavigate } from "react-router";
import "./Login.css";
import api from "./api/axios.jsx";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="loginCard">
      <h2 className="loginTitle">Welcome back!</h2>
      <form
        action={async (formdata) => {
          api
            .post("/auth/login", formdata)
            .then(() => {
              navigate("/projects");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        className="loginForm"
      >
        <div className="grid-col-span-2">
          <label htmlFor="username" className="inputLabel">
            Username
          </label>
          <br />
          <input
            className="inputBox"
            id="username"
            name="username"
            type="text"
            required
          />
        </div>
        <div className="grid-col-span-2">
          <label htmlFor="pass" className="inputLabel">
            Password
          </label>
          <input
            className="inputBox"
            id="pass"
            name="password"
            type="password"
            required
          />
        </div>
        <input className="formButton" type="submit" value="Login" />
        <NavLink to="/register">
          <input className="formButton" type="button" value="Register" />
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
