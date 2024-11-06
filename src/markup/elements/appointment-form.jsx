import React, { useState, useEffect } from 'react';
import api from "../../constants/api";
import { message } from 'antd';

export default function AppointmentForm() {
	const [appointment, setAppointment] = useState({
		customer_name: '',
		email: '',
		phone: '',
		comments: '',
		department: '',
		hours: '',
		city: ''
	});

	const [errors, setErrors] = useState({}); // State for error messages
	const [valueList, setValueList] = useState([]);
	const [valueList1, setValueList1] = useState([]);
	const [valueList2, setValueList2] = useState([]);

	useEffect(() => {
		getValueList();
		getValueList1();
		getValueList2();
	}, []);

	// Function to validate all fields
	const validateFields = () => {
		let errors = {};
		if (!appointment.customer_name.trim()) {
			errors.customer_name = 'Name is required';
		}
		if (!appointment.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(appointment.email)) {
			errors.email = 'Email address is invalid';
		}
		if (!appointment.phone.trim()) {
			errors.phone = 'Phone number is required';
		} else if (!/^\d{10}$/.test(appointment.phone)) {
			errors.phone = 'Phone number must be 10 digits';
		}
		if (!appointment.comments.trim()) {
			errors.comments = 'Comments are required';
		}
		if (!appointment.department) {
			errors.department = 'Department selection is required';
		}
		if (!appointment.hours) {
			errors.hours = 'Hours selection is required';
		}
		
		return errors;
	}

	const onEnquirySubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission
		const validationErrors = validateFields();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			api.post('/enquiry/insertEnquiry', {
				customer_name: appointment.customer_name,
				email: appointment.email,
				phone: appointment.phone,
				comments: appointment.comments,
				department: appointment.department,
				hours: appointment.hours,
				city: appointment.city
			})
			.then((res) => {
				console.log(res);
				message.success("Registered Successfully");
				setAppointment({ // Reset the form fields
					customer_name: '',
					email: '',
					phone: '',
					comments: '',
					department: '',
					hours: '',
					city: ''
				});
			})
			.catch(() => {
				message.error('Unable to create record.');
			});
		} else {
			message.error('Please fill all required fields correctly.');
		}
	}

	const updateContactFields = (e) => {
		const fieldName = e.target.name;
		setAppointment(existingValues => ({
			...existingValues,
			[fieldName]: e.target.value,
		}));
	}

	const getValueList = () => {
		api.get("/valuelist/getValueListDepartment")
			.then((res) => {
				setValueList(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};

	const getValueList1 = () => {
		api.get("/valuelist/getValueListHours")
			.then((res) => {
				setValueList1(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};

	const getValueList2 = () => {
		api.get("/valuelist/getValueListState")
			.then((res) => {
				setValueList2(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};

	return (
		<form className="form-wraper contact-form ajax-form">
						<h3 className="title">Book a Lakshmi Mission Hospital Service today</h3>
			<h5>For any <b>free</b> online consultation.</h5>
			<h6>
				<span>
					<a href="mailto:Imhpudhur@gmail.com">
						<i className="fas fa-envelope"></i> Imhpudhur@gmail.com
					</a>
				</span>
			</h6>

			<div className="form-group">
				<select
					name="department"
					className="form-select form-control"
					onChange={updateContactFields}
					value={appointment.department}
				>
					<option value="">Select Department *</option>
					{valueList && valueList.map((e) => (
						<option key={e.valuelist_id} value={e.value}>
							{e.value}
						</option>
					))}
				</select>
				{errors.department && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.department}</span>}
			</div>

			<div className="form-group">
				<select
					name="hours"
					className="form-select form-control"
					onChange={updateContactFields}
					value={appointment.hours}
				>
					<option value="">Select Hours *</option>
					{valueList1 && valueList1.map((e) => (
						<option key={e.valuelist_id} value={e.value}>
							{e.value}
						</option>
					))}
				</select>
				{errors.hours && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.hours}</span>}
			</div>

			<div className="form-group">
				<select
					name="city"
					className="form-select form-control"
					onChange={updateContactFields}
					value={appointment.city}
				>
					<option value="">Select City *</option>
					{valueList2 && valueList2.map((e) => (
						<option key={e.valuelist_id} value={e.value}>
							{e.value}
						</option>
					))}
				</select>
				{errors.city && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.city}</span>}
			</div>

			<div className="form-group">
				<input
					name="customer_name"
					type="text"
					className="form-control"
					placeholder="Your Name *"
					onChange={updateContactFields}
					value={appointment.customer_name}
				/>
				{errors.customer_name && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.customer_name}</span>}
			</div>

			<div className="form-group">
				<input
					name="phone"
					type="number"
					className="form-control"
					placeholder="Phone Number *"
					onChange={updateContactFields}
					value={appointment.phone}
				/>
				{errors.phone && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.phone}</span>}
			</div>

			<div className="form-group">
				<input
				 	name="email"
					type="email"
					className="form-control"
					placeholder="Email *"
					onChange={updateContactFields}
					value={appointment.email}
				/>
				{errors.email && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.email}</span>}
			</div>

			<div className="form-group">
				<textarea
					name="comments"
					className="form-control"
					placeholder="Comments *"
					onChange={updateContactFields}
					value={appointment.comments}
				/>
				{errors.comments && <span className="text-danger" style={{ fontSize: '10px' }}>{errors.comments}</span>}
			</div>

			<button onClick={onEnquirySubmit} type="submit" className="btn btn-secondary btn-lg">
				Enquiry
			</button>
</form>
	);
}
