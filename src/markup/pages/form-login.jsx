import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import Images
import logo from "../../images/logo.png";
import api from '../../constants/api';

function Login()  {
	const [signinData, setSigninData] = useState({
		email: "",
		password: "",
	});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const navigate = useNavigate(); // Replace useHistory with useNavigate

	const validateEmail = (email) => {
		// Email validation regex pattern
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};
	
	const validatePassword = (password) => {
		// Password validation regex pattern
		const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
		return passwordPattern.test(password);
	};

	const handleSigninData = (e) => {
		setSigninData({ ...signinData, [e.target.name]: e.target.value });
	};

	const signin = (event) => {
		event.preventDefault();
		setEmailError("");
		setPasswordError("");

		// Perform email and password validation
		if (!validateEmail(email)) {
			setEmailError("Invalid email");
		}

		if (!validatePassword(password)) {
			setPasswordError(
				"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, special character, and one number"
			);
		}

		// If both email and password are valid, proceed with form submission
		if (validateEmail(email) && validatePassword(password)) {
			api.post("/api/login", signinData)
				.then((res) => {
					if (res && res.status === "400") {
						alert("Invalid Username or Password");
					} else {
						localStorage.setItem("user", JSON.stringify(res.data.data));
						localStorage.setItem("token", JSON.stringify(res.data.token));
						setTimeout(() => {
							navigate('/'); // Use navigate instead of history.push
						}, 300);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	return (
		<>
			<div className="section-area account-wraper2">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-8">
							<div className="appointment-form form-wraper">
								<div className="logo">
									<img src={logo} alt=""/>
								</div>
								<form onSubmit={signin}>
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Email"
											name="email"
											onChange={(e) => {
												handleSigninData(e);
												setEmail(e.target.value);
											}}
										/>
									</div>
									{emailError && <span className="error">{emailError}</span>}
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Password"
											name="password"
											onChange={(e) => {
												handleSigninData(e);
												setPassword(e.target.value);
											}}
										/>
										{passwordError && <span className="error">{passwordError}</span>}
									</div>
									<div className="form-group">
										<button type="submit" className="btn mb-30 btn-lg btn-primary w-100" onClick={signin}>Login</button>
										<Link to="/forget-password" data-toggle="tab">Forgot Password</Link>
									</div>
									<div className="text-center mt-40">
										<p className="mt-0">Don't have an account?</p>
										<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-register">Register</Link>
									</div>											
								</form>
							</div>
						</div>
					</div>					
				</div>
			</div>
		</>
	);
}

export default Login;
