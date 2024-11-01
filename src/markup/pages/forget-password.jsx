import React, { useState } from 'react';
// Import Images
import logo from "../../images/logo.png";
import api from '../../constants/api';

function ForgotPassword()  {
	const [email, setEmail] = useState("");
  
	const handleEmailChange = (event) => {
	  setEmail(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
	
api
  .post("api/forgot", { email: email })
  .then((res) => {
    if (res.status === 200) { // Check if the response is successful
      alert('Reset mail has been sent to your email Id');
    } else {
      alert('There was an issue sending the reset email. Please try again.');
    }
  })
  .catch((err) => {
    console.log("error", err);
    alert('Failed to send reset email. Please check the email and try again.');
  });
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
								<form>
                                <input
                                  type="text"
                                  name="email"
								  className="form-control" 
                                  placeholder="Email"
                                  onChange={handleEmailChange}
                                />

                                <div className="button-box">
                                  <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100 radius-xl" style={{marginTop:"20px"}}>
                                    <span>Send Reset Link</span>
                                  </button>
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

export default ForgotPassword;
