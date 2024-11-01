import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../images/logo.png";
import api from '../../constants/api';

function ResetPassword() {

  const navigate = useNavigate(); 
  const location = useLocation(); // Use useLocation to get the location object

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [token, setToken] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if password and confirm password match
    if (password === confirmPassword) {
      // Passwords match, handle form submission
      api
        .post('/api/reset', { newPassword: password, resetToken: token })
        .then(() => {
          setTimeout(() => {
            navigate('/'); // Use navigate instead of history.push
          }, 300);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Passwords do not match
      setPasswordMatch(false);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("token") ? urlSearchParams.get("token") : null;
    const q = query !== null ? query.slice(0, -1) : '';
    setToken(q);
  }, [location.search]);
	
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
									<form action="#">
										<div className="form-group">
											<input type="password" 
											className="form-control" 
											placeholder="Password"
											name='password'
											onChange={handlePasswordChange}
                                        />
										</div>
										<div className="form-group">
											<input type="password"
											className="form-control"
											placeholder="New Password" 
											name='confirmPassword'
											onChange={handleConfirmPasswordChange}
											/>
										</div>
										{!passwordMatch && (
                                  <p>Passwords do not match.</p>
                                )}						
										<div className="form-group">
											<button type='submit' onClick={handleSubmit} className="btn btn-primary w-100 radius-xl">Submit</button>
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
				
			</>
		);
	}

export default ResetPassword;