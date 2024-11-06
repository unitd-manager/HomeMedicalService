import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../constants/api';

function Cart() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage
    const contactId = user ? user.contact_id : null; // Retrieve contact_id if user object is present
    console.log('Fetched contact_id from user object in localStorage:', contactId); // Log for debugging

    const fetchCartItems = async () => {
      if (!contactId) {
        return;
      }

      try {
        const response = await api.post(`/contact/getContactsById`, { contact_id: contactId });
        console.log('API response data:', response.data); // Log API response for debugging

        // Ensure the response contains the 'data' array and set the first item as userData
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          setUserData(response.data.data[0]); // Set the first contact's data
        } else {
          setUserData({}); // In case the 'data' key is not an array or is empty
        }
      } catch (error) {
        console.error("Error fetching cart items:", error); // Log any error encountered
      }
    };

    // Call fetchCartItems if contactId is available
    if (contactId) {
      fetchCartItems();
    }
  }, []); // Run only once on component mount

  return (
    <>
      <ToastContainer />
      <div className="page-content bg-light" style={{paddingTop:"150px"}}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Checkout</h2>
          </div>
          <div className="cart-details">
            <div className="section-area account-wrapper" style={{paddingTop:"150px"}}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-6 col-md-8">
                    <div className="account-form card p-4">
                      <form>
                        <div className="form-group mb-3">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            name="first_name"
                            value={userData.first_name || ''} // Safe access to first_name
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                            name="mobile"
                            value={userData.mobile || ''} // Safe access to mobile
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={userData.email || ''} // Safe access to email
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your address"
                            name="address1"
                            value={userData.address1 || ''} // Safe access to address1
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/add-cart" className="btn btn-secondary">Back to Cart</Link>
              <Link to="/payment" className="btn btn-secondary">Proceed payment</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
