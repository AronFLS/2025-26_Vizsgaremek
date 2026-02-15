import "./account.css";

function Account() {
  return (
    <div className="main-content">
      <p id="title">Create Account</p>
      <p id="alt-title">Fill in your information to register</p>
      <div id="name">
        <div id="firstname">
          <p className="label">First name:</p>
          <input type="text" />
        </div>
        <div id="lastname">
          <p className="label">Last name:</p>
          <input type="text" />
        </div>
      </div>
      <p className="label">Email address:</p>
      <input type="text" />
      <p className="label">Password:</p>
      <input type="password" />
      <p className="label">Confirm password:</p>
      <input type="password" />
      <p className="label">Phone number:</p>
      <input type="text" />
      <button id="signup-button">Sign up</button>
    </div>
  );
}

export default Account;
