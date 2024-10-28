import React, { useState, useEffect } from 'react';
import api from "../../constants/api";

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
	const [valueList, setValueList] = useState([]);
	const [valueList1, setValueList1] = useState([]);
	const [valueList2, setValueList2] = useState([]);


	useEffect(() => {
		getValueList();
		getValueList1();
		getValueList2();

	}, []);

	const onEnquirySubmit = (e) => {
		e.preventDefault();
		if (appointment.customer_name && appointment.email && appointment.comments) {
			api.post('/addEnquiry', {
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
				alert('Record created successfully');
			})
			.catch(() => {
				alert('Unable to create record.');
			});
		} else {
			alert('Please fill all required fields.');
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
		api
			.get("/valuelist/getValueListDepartment")
			.then((res) => {
				setValueList(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};
	const getValueList1 = () => {
		api
			.get("/valuelist/getValueListHours")
			.then((res) => {
				setValueList1(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};
	const getValueList2 = () => {
		api
			.get("/valuelist/getValueListState")
			.then((res) => {
				setValueList2(res.data.data);
			})
			.catch((error) => {
				console.error("Error fetching content data:", error);
			});
	};

	return (
		<div className="appointment-form form-wrapper">
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
						<option value="">Select Department</option>
						{valueList && valueList.map((e) => (
							<option key={e.valuelist_id} value={e.valuelist_id}>
								{e.value}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<select
						name="hours"
						className="form-select form-control"
						onChange={updateContactFields}
						value={appointment.hours}
					>
						<option value="">Select Hours</option>
						{valueList1 && valueList1.map((e) => (
							<option key={e.valuelist_id} value={e.valuelist_id}>
								{e.value}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<select
						name="city"
						className="form-select form-control"
						onChange={updateContactFields}
						value={appointment.city}
					>
						<option value="">Select City</option>
						{valueList2 && valueList2.map((e) => (
							<option key={e.valuelist_id} value={e.valuelist_id}>
								{e.value}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<input
						name="customer_name"
						type="text"
						className="form-control"
						placeholder="Your Name"
						onChange={updateContactFields}
						value={appointment.customer_name}
					/>
				</div>
				<div className="form-group">
					<input
						name="phone"
						type="number"
						className="form-control"
						placeholder="Phone Number"
						onChange={updateContactFields}
						value={appointment.phone}
					/>
				</div>
				<div className="form-group">
					<input
						name="email"
						type="email"
						className="form-control"
						placeholder="Email"
						onChange={updateContactFields}
						value={appointment.email}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="comments"
						className="form-control"
						placeholder="Comments"
						onChange={updateContactFields}
						value={appointment.comments}
					/>
				</div>
				<button onClick={()=>{
             
			 onEnquirySubmit();
			 
		   }} type="submit" className="btn btn-secondary btn-lg">Enquiry</button>
		</div>
	);
}
