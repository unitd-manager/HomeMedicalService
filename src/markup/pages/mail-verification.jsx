import React, { useState, useEffect } from 'react';
import api from '../../constants/api';
import { useLocation } from 'react-router-dom';

const MailVerification = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        console.log("Component mounted. Current location object:", location);

        const urlSearchParams = new URLSearchParams(location.search);
        const token = urlSearchParams.get("token") || ''; 

        console.log("Extracted token from URL:", token); 

        if (token) {
            api
                .post('/commonApi/resetVerification', { resetToken: token })
                .then(() => {
                    setSuccess(true);
                    setLoading(false); 
                })
                .catch((err) => {
                    setError(true);
                    setLoading(false); 
                    console.error("API error:", err);
                });
        } else {
            console.error("No token found in the URL."); 
            setLoading(false); 
        }
        console.log("Extracted token from URL:", token); 
    }, [location.search]);


    return (
        <div className="section-area account-wraper2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="appointment-form form-wraper">
                            {loading && (
                                <h4 style={{ textAlign: "center" }}>Verifying your email...</h4>
                            )}
                            {success && (
                                <div>
                                    <i className="checkmark order-i">✓</i>
                                    <h4 style={{ textAlign: "center", color: "green", fontSize: 30, fontWeight: 'bold' }}>
                                        Your Email is verified successfully
                                    </h4>
                                </div>
                            )}
                            {error && (
                                <div>
                                    <h4 style={{ color: "red", textAlign: "center" }}>Verification failed. Please try again.</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>					
            </div>
        </div>
    );
};

export default MailVerification;
