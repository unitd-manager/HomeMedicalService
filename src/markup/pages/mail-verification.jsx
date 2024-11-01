import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../constants/api';

const MailVerification = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Log to check if useEffect runs
        console.log("useEffect is running.");

        // Log the full location object
        console.log("Location object:", location);

        // Extract the token from the URL
        const urlSearchParams = new URLSearchParams(location.search);
        const token = urlSearchParams.get("token") || ''; 
        console.log("Extracted token:", token);

        if (token) {
            // API call only if token is present
            api
                .post('/commonApi/resetVerification', { resetToken: token })
                .then(() => {
                    setSuccess(true);
                    setLoading(false);
                    console.log("Verification success.");
                })
                .catch((err) => {
                    setError(true);
                    setLoading(false);
                    console.error("API error:", err);
                });
        } else {
            console.warn("No token found in the URL.");
            setLoading(false);
        }
    }, [location]); // Dependency on `location` so it runs when URL changes

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
