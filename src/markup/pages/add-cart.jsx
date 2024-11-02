import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../images/logo.png";

function Cart() {
  const [nurses, setNurses] = useState([
    { id: 1, name: "Nurse A", dayPrice: 1000, nightPrice: 1500, selectedShift: 'day' },
    { id: 2, name: "Nurse B", dayPrice: 1200, nightPrice: 1800, selectedShift: 'day' },
  ]);

  const handleShiftChange = (id, shift) => {
    setNurses(nurses.map(nurse => 
      nurse.id === id ? { ...nurse, selectedShift: shift } : nurse
    ));
  };

  const handleRemoveItem = (id) => {
    setNurses(nurses.filter(nurse => nurse.id !== id));
  };

  const calculateTotalPrice = () => {
    return nurses.reduce((total, nurse) => 
      total + (nurse.selectedShift === 'day' ? nurse.dayPrice : nurse.nightPrice), 
    0);
  };

  return (
    <>
      <ToastContainer/>
      <div className="page-content bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: '150px' }}/>
            <h2>Service Cart</h2>
          </div>
          <div className="cart-details">
            {nurses.map(nurse => (
              <div key={nurse.id} className="cart-item position-relative p-3 mb-3 bg-white rounded shadow-sm">
                <button 
                  className="btn btn-danger btn-sm position-absolute" 
                  style={{ top: '10px', right: '10px' }}
                  onClick={() => handleRemoveItem(nurse.id)}
                >
                  <i className="fas fa-trash" style={{ color: 'white' }}></i>
				</button>
                
                <h4>{nurse.name}</h4> 
                <p className="mb-2">Day Price: {nurse.dayPrice} | Night Price: {nurse.nightPrice}</p>
                <div className="form-group">
                  <label>Shift:</label>
                  <select 
                    value={nurse.selectedShift} 
                    onChange={(e) => handleShiftChange(nurse.id, e.target.value)}
                    className="form-control"
                  >
					<option value="">Select Shift</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="total-price text-center mt-4">
              <h3>Total Price: {calculateTotalPrice()}</h3>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/services" className="btn btn-secondary">Continue Browsing Services</Link>
              <button className="btn btn-primary">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
