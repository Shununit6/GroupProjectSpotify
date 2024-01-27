import React, { useState } from "react";
import { login, logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    closeModal();
    const email = "demo@user.io";
    const password ="password"
    return await dispatch(login(email, password))
  };

  return (
    <>
      <div id="loginmodal">
      <h1>Log In</h1>
      <div>
      <form id="loginform" onSubmit={handleSubmit}>
        <div>
          {errors && errors.map((error, idx) => (
              <p key={idx}>{error}</p>
          ))}
        </div>
        <div>
          <label>
            Email
            <input
              className="loginput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={4}
              required
            />
          </label>
          {(email.length<4) &&
          <p>Email has at least 4 characters</p>}
        </div>
        <div>
          <label>
            Password
            <input
              className="loginput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength = {6}
              required
            />
          </label>
          {(password.length<6) &&
          <p>Password has at least 6 characters</p>}
        </div>
        {(email.length<4 || password.length<6) &&
        <button id="disabledlogin" disabled={true}>Log In</button>}
        {email.length>=4 && password.length>=6 &&
        <button id="loginsubmitbutton" type="submit">Log In</button>}
        <button id="logindemobutton" onClick={handleDemoLogin}>
            <Link className="logindemobutton" to="/" >Log in as Demo User</Link>
        </button>
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginFormModal;
