import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../images/logo.png";
import api from '../../constants/api';

function ResetPassword() {
  const navigate = useNavigate(); 
  const location = useLocation();

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
      setPasswordMatch(true);
      api
        .post('/api/resetpassword', { newPassword: password, resetToken: token })
        .then(() => {
          setTimeout(() => {
            navigate('/'); // Redirect to the login page
          }, 300);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPasswordMatch(false);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const queryToken = urlSearchParams.get("token");
    setToken(queryToken);
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      name="password"
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  {!passwordMatch && (
                    <p style={{ color: 'red' }}>Passwords do not match.</p>
                  )}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 radius-xl"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="text-center mt-40">
                    <p className="mt-0">Already have an account?</p>
                    <Link className="btn btn-lg btn-secondary w-100" to="/form-login">
                      Login
                    </Link>
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
