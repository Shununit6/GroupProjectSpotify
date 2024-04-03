import React, { useState, useEffect } from "react";
import { login, logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    if (submitting) {
      const emailValid = email.length >= 4 && validateEmail(email);
      const passwordValid = password.length >= 6;
      setErrors({
        email: emailValid ? null : "Email must have at least 4 characters and be valid",
        password: passwordValid ? null : "Password must have at least 6 characters"
      });
    }
  }, [email, password, submitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (email.length >= 4 && validateEmail(email) && password.length >= 6) {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal()
      }
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    closeModal()
    const demoEmail = "demo@aa.io";
    const demoPassword ="password";
    setEmail(demoEmail);
    setPassword(demoPassword);
    await dispatch(login(demoEmail, demoPassword));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isDisabled = submitting || !!(errors.email || errors.password);

  return (
    <>
      <div id="loginmodal">
        <h1>Log In</h1>
        <div>
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="loginput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                minLength={4}
                required
              />
              {errors.email && <p className="input-error">{errors.email}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="loginput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              {errors.password && <p className="input-error">{errors.password}</p>}
            </div>
            <button id="loginsubmitbutton" type="submit" disabled={isDisabled}>
              Log In
            </button>
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
