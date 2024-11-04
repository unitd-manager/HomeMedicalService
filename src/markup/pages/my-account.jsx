import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../constants/api';

const Account = () => {
	const [userData, setUserData] = useState({
		first_name: '',
		phone_no: '',
		email: '',
		address: ''
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const contactId = JSON.parse(localStorage.getItem('user')).contact_id;

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Make sure to pass the contact ID in the request body
				const response = await api.post('/contact/getContactsById', {
					contact_id: contactId, // Sending the contact ID in the request body
				});
	
				// Set user data from the response
				if (response.data.msg === 'Success') {
					setUserData(response.data.data[0]); // Assuming the result is an array and you want the first item
				} else {
					setErrorMessage('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				setErrorMessage('Failed to fetch user data');
			}
		};
	
		fetchUserData();
	}, [contactId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setSuccessMessage('');
	
		try {
			// Send the user data along with the contact ID in the request body
			const response = await api.post('/contact/editContactProfile', {
				contact_id: contactId, // Include the contact ID
				email: userData.email,
				mobile: userData.mobile,
				first_name: userData.first_name,
				address1: userData.address1,
				address_state: userData.address_state,
				address_country_code: userData.address_country_code,
			});
	
			// Check the response message for success
			if (response.data.msg === 'Success') {
				setSuccessMessage('User details updated successfully!');
			} else {
				setErrorMessage('Failed to update user details');
			}
		} catch (error) {
			console.error('Error updating user data:', error);
			setErrorMessage('Failed to update user details');
		}
	};
	return (
		<>
			<ToastContainer />
			<div className="section-area account-wrapper" style={{paddingTop:"150px"}}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-8">
							<div className="account-form card p-4">
								<h2 className="text-center mb-4">My Account</h2>
								<form onSubmit={handleSubmit}>
									<div className="form-group mb-3">
										<label>First Name</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter your first name"
											name="first_name"
											value={userData.first_name}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group mb-3">
										<label>Phone Number</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter your phone number"
											name="mobile"
											value={userData.mobile}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group mb-3">
										<label>Email</label>
										<input
											type="email"
											className="form-control"
											placeholder="Enter your email"
											name="email"
											value={userData.email}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group mb-3">
										<label>Address</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter your address"
											name="address1"
											value={userData.address1}
											onChange={handleChange}
										/>
									</div>
									{errorMessage && <span className="text-danger">{errorMessage}</span>}
									{successMessage && <div className="text-success mt-2">{successMessage}</div>}
									<div className="form-group">
										<button type="submit" className="btn btn-primary w-100">Update</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
