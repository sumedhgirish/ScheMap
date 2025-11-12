import "./Login.css";

function Login() {
  return (
    <div className="loginCard">
      <h2 className="loginTitle">Welcome back!</h2>
      <form action={() => console.log("sample action")} className="loginForm">
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
        <div className="buttons">
          <input className="formButton" type="submit" value="Login" />
          <input className="formButton" type="button" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Login;
