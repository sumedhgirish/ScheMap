import "./Register.css";

function Register() {
  return (
    <div className="registerCard">
      <h2 className="registerTitle">Create Account</h2>
      <form
        action={() => console.log("sample action")}
        className="registerForm"
      >
        <div>
          <label htmlFor="firstname" className="inputLabel">
            First Name
          </label>
          <br />
          <input
            type="text"
            id="firstname"
            name="first"
            className="inputBox"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname" className="inputLabel">
            Last Name
          </label>
          <br />
          <input
            type="text"
            id="last"
            name="last"
            className="inputBox"
            required
          />
        </div>
        <div className="grid-col-span-full">
          <label htmlFor="username" className="inputLabel">
            Username
          </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            className="inputBox"
            required
          />
        </div>
        <div className="grid-col-span-full">
          <label htmlFor="password" className="inputLabel">
            Password
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="inputBox"
            required
          />
        </div>
        <div className="grid-col-span-full">
          <label htmlFor="rpassword" className="inputLabel">
            Repeat Password
          </label>
          <br />
          <input
            type="password"
            id="rpassword"
            name="rpassword"
            className="inputBox"
            required
          />
        </div>
        <input
          className="formButton grid-col-span-full"
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
}

export default Register;
