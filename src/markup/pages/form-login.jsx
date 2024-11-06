import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../images/icon.png";
import api from '../../constants/api';

function Login()  {
	const [signinData, setSigninData] = useState({
		email: "",
		password: "",
	});
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};
	
	const validatePassword = (password) => {
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
		if (!validateEmail(signinData.email)) {
			setEmailError("Invalid email");
		}

		if (!validatePassword(signinData.password)) {
			setPasswordError(
				"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, special character, and one number"
			);
		}

		// If both email and password are valid, proceed with form submission
		if (validateEmail(signinData.email) && validatePassword(signinData.password)) {
			api.post('/api/login', signinData)
				.then((res) => {
					if (res && res.status === "400") {
						alert("Invalid Username or Password");
					} else {
						localStorage.setItem("user", JSON.stringify(res.data.data));
						localStorage.setItem("token", JSON.stringify(res.data.token));
		
						setSuccessMessage("Login successful!");
		
						setTimeout(() => {
							navigate('/'); 
						}, 500);
					}
				})
				.catch((err) => {
					console.error(err);
					setErrorMessage("Login Failed");

				});
		}
		
	};

	return (
		<>
			<ToastContainer/>
			<div className="section-area account-wraper2">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-8">
							<div className="appointment-form form-wraper">
								<div className="logo">
								<img
                src={logo}
                alt="lakshmimission"
                style={{ width: "100px", height: "auto", marginTop: "10px" }}
              />
								</div>
								<form onSubmit={signin}>
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Email"
											name="email"
											onChange={handleSigninData}
											value={signinData.email}
										/>
									</div>
									{emailError && <span className="error">{emailError}</span>}
									<div className="form-group">
										<input
											type="password"
											className="form-control"
											placeholder="Password"
											name="password"
											onChange={handleSigninData}
											value={signinData.password}
										/>
										{passwordError && <span className="error">{passwordError}</span>}
										{successMessage && (
							<div style={{ color: "green", marginTop: "10px" }}>
								{successMessage}
							</div>
						)}
										{errorMessage && (
							          <div style={{ color: "green", marginTop: "10px" }}>
								     {errorMessage}
						             	</div>
						)}
									</div>
									<div className="form-group">
										<button type="submit" className="btn mb-30 btn-lg btn-primary w-100">Login</button>
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
