import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        if (submitting) {
            const emailValid = email.length >= 4 && validateEmail(email);
            const usernameValid = username.length >= 4;
            const passwordValid = password.length >= 6;
            const confirmPasswordValid = confirmPassword === password;
            setErrors({
                email: emailValid ? null : "Email must have at least 4 characters and be valid",
                username: usernameValid ? null : "Username must have at least 4 characters",
                password: passwordValid ? null : "Password must have at least 6 characters",
                confirmPassword: confirmPasswordValid ? null : "Confirm Password must match Password",
            });
        }
    }, [email, username, password, confirmPassword, submitting]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (email.length >= 4 && username.length >= 4 && password.length >= 6 && confirmPassword === password) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isDisabled = submitting || !!(errors.email || errors.username || errors.password || errors.confirmPassword);

    return (
        <>
            <div id="signupmodal">
                <h1>Sign Up</h1>
                <form id="signupform" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="signupinput"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            minLength={4}
                            required
                        />
                        {errors.email && <p className="input-error">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            className="signupinput"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength={4}
                            required
                        />
                        {errors.username && <p className="input-error">{errors.username}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="signupinput"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                        {errors.password && <p className="input-error">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            className="signupinput"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
                    </div>
                    <button id="signupsubmitbutton" type="submit" disabled={isDisabled}>
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
