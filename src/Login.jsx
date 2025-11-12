import { NavLink, useNavigate } from "react-router";
import "./Login.css";

async function AuthUser(formdata, navigate) {
  try {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formdata)),
    });
    const data = await result.json();
    if (data.auth_token) {
      localStorage.setItem("auth_token", data.auth_token);
      navigate("/projects");
    }
  } catch (err) {
    console.log(err);
  }
}

function Login() {
  const navigate = useNavigate();
  return (
    <div className="loginCard">
      <h2 className="loginTitle">Welcome back!</h2>
      <form
        action={(formdata) => AuthUser(formdata, navigate)}
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
