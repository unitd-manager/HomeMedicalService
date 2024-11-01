import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";
import api from '../../constants/api';

const FormLogin = () => {
	const [registerForm, setRegisterForm] = useState({
		first_name: '',
		email: '',
		pass_word: '',
		phone: '',
	});
	const navigate = useNavigate(); 

	const insertContact = () => {
		return api
			.post("/api/register", registerForm)
			.then((res) => {
				setRegisterForm(res.data.data);
				console.log('User registered:', res.data.data);
			})
			.catch((err) => {
				console.error('Registration error:', err);
			});
	};

	const sendMail = () => {
		const to = registerForm.email;
		const subject = "Registration";
		return api
			.post("/commonApi/sendUseremail", { to, subject })
			.then(() => {
				console.log('Email sent to:', registerForm.email);
				setTimeout(() => {
					navigate("/form-login");
				}, 100);
				alert('Registration mail has been sent');
			})
			.catch((err) => {
				console.error('Email sending error:', err);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Ensure the form does not reload the page
		await insertContact();
		await sendMail();
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRegisterForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="section-area account-wraper2">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-5 col-lg-6 col-md-8">
						<div className="appointment-form form-wraper">
							<div className="logo">
								<img src={logo} alt=""/>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<input 
										type="text" 
										name="first_name" 
										className="form-control" 
										placeholder="Name" 
										value={registerForm.first_name} 
										onChange={handleInputChange} 
									/>
								</div>
								
								<div className="form-group">
									<input 
										type="text" 
										name="phone" 
										className="form-control" 
										placeholder="Phone" 
										value={registerForm.phone} 
										onChange={handleInputChange} 
									/>
								</div>
								<div className="form-group">
									<input 
										type="email" 
										name="email" 
										className="form-control" 
										placeholder="Email" 
										value={registerForm.email} 
										onChange={handleInputChange} 
									/>
								</div>
								
								<div className="form-group">
									<input 
										type="password" 
										name="pass_word" 
										className="form-control" 
										placeholder="Password" 
										value={registerForm.pass_word} 
										onChange={handleInputChange} 
									/>
								</div>	
								<div className="form-group">
								<button type="submit" className="btn btn-primary w-100 radius-xl">
										Register Now
									</button>
								</div>
								<div className="text-center mt-40">						
									<p className="mt-0">Already have an account?</p>
									<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-login">Login</Link>
								</div>	
							</form>
						</div>
					</div>
				</div>					
			</div>
		</div>
	);
};

export default FormLogin;
