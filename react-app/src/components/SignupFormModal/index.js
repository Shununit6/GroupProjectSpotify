import React, { useState } from "react";
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
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	let disabled = true;
    if(email.length > 0 && confirmPassword.length > 0 && username.length >=4 && password.length >= 6){
            disabled = false;
    }

	return (
		<>
		<div id="signupmodal">
			<h1>Sign Up</h1>
			<form id="signupform" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email <br></br>
					<input
						className="signupinput"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						minLength={4}
						required
					/>
				</label>
				{(email.length<4) && <p>Email has at least 4 characters</p>}
				<label>
					Username <br></br>
					<input
						className="signupinput"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password <br></br>
					<input
						className="signupinput"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength = {6}
						required
					/>
				</label>
				{(password.length<6) && <p>Password has at least 6 characters</p>}
				<label>
					Confirm Password
					<input
						className="signupinput"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
                {disabled && <button id="disabledsignup">Sign Up</button>}
                {!disabled && <button id="regularsignup" type="submit">Sign Up</button>}
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
