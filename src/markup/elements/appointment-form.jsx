import React, { Component } from 'react';

class appointmentForm extends Component{
	render(){
		return(
			<>
				
				<div className="appointment-form form-wraper">
					<h3 className="title">Book a Lakshmi Mission Hospital Service today</h3>
					<form action="#">
						<div className="form-group">
							<select className="form-select form-control">
								<option defaultValue>Select Department</option>
								<option defaultValue="1">Nursing Attender</option>
								<option defaultValue="2">Experienced Caregiver</option>
								<option defaultValue="3">Physiotheraphy</option>
								<option defaultValue="4">Nurse Visit</option>
							</select>
						</div>
						<div className="form-group">
							<select className="form-select form-control">
								<option defaultValue>Select Hours</option>
								<option defaultValue="1">5 Hours</option>
								<option defaultValue="2">10 Hours</option>
								<option defaultValue="3">15 Hours</option>
								<option defaultValue="4">Visit Only</option>
							</select>
						</div>
						<div className="form-group">
							<select className="form-select form-control">
								<option defaultValue>City</option>
								<option defaultValue="1">Tirunelveli</option>
								<option defaultValue="2">Vellore</option>
								<option defaultValue="3">Tenkasi</option>
								<option defaultValue="4">Kanyakumari</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Your Name"/>
						</div>
						<div className="form-group">
							<input type="number" className="form-control" placeholder="Phone Numbers"/>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Email"/>
						</div>
						<div className="form-group">
							<input type="textarea" className="form-control" placeholder="Comments"/>
						</div>
						<button type="submit" className="btn btn-secondary btn-lg">Enquiry</button>
					</form>
				</div>
			
			</>
		);
	}
}

export default appointmentForm;