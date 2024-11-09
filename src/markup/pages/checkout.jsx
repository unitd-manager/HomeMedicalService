import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../constants/api';

// Load Razorpay Script Dynamically
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
}

function Checkout() {
  const [userData, setUserData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const contactId = user ? user.contact_id : null;
    console.log('Fetched contact_id from user object in localStorage:', contactId);

    // Fetch cart items and calculate total amount
    const fetchCartItems = async () => {
      if (!contactId) {
        console.log('No contact_id available');
        return;
      }
    
      console.log('Fetching cart items...');
    
      try {
        const response = await api.post(`/orders/getBaskets`, { contact_id: contactId });
        console.log('BasketAPI response:', response.data);
    
        // Access the nested data array
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const items = response.data.data; // Access the correct data array
          setCartItems(items);
    
          console.log('Cart Items:', items); // Log items to verify data
    
          // Calculate total amount
          const total = items.reduce((sum, item) => {
            const qty = parseFloat(item.qty) || 0;       // Ensure qty is a number
            const unit_price = parseFloat(item.unit_price) || 0; // Ensure unit_price is a number
            return sum + (qty * unit_price);
          }, 0);
    
          console.log('Total calculated:', total);
          setTotalAmount(total); // Update the total amount
        } else {
          console.log('No valid cart items received.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    
    
    

    // Fetch user data
    const fetchUserData = async () => {
      if (!contactId) return;

      try {
        const response = await api.post(`/contact/getContactsById`, { contact_id: contactId });
        console.log('API response data:', response.data);

        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          setUserData(response.data.data[0]);
        } else {
          setUserData({});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (contactId) {
      fetchCartItems();
      fetchUserData();
    }
  }, []);
  const deleteCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const contactId = user ? user.contact_id : null;
      
      if (!contactId) return;

      const response = await api.post('/orders/deleteBasketContact', { contact_id: contactId });
      if (response.status === 200) {
        console.log('Cart items deleted successfully.');
        setCartItems([]); // Clear cart items from state
      } else {
        console.error('Failed to delete cart items.');
      }
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };
  const handlePayment = async () => {
    try {
      // Load Razorpay script if not loaded
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Failed to load Razorpay script');
        return;
      }

      const totalAmountInPaise = totalAmount * 100; // Convert to paise (1 INR = 100 paise)
      console.log('totalAmountInPaise', totalAmountInPaise);

      if (window.Razorpay) {
        const options = {
          key: 'rzp_test_yE3jJN90A3ObCp', // Replace with your actual Razorpay key
          amount: totalAmountInPaise,
          currency: 'INR',
          name: userData.first_name,
          description: 'Test Transaction',
          handler: async function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            
            // Step 1: Insert data into the `order` table
            const orderResponse = await api.post('/orders/insertorders', {
              contact_id: userData.contact_id,
              shipping_email: userData.email,
              shipping_phone: userData.mobile,
              shipping_address1: userData.address1,
             
            });
            console.log('Order creation response data:', orderResponse.data.data);
            const orderId = orderResponse.data.data.insertId; // Ensure this is the correct way to access order_id
            if (orderId) {
              try {
                const response = await api.post('/orders/insertOrderItems', {
                  order_id: orderId,
                  items: cartItems.map(item => ({
                    product_id: item.product_id,
                    qty: parseFloat(item.qty),
                    unit_price: parseFloat(item.unit_price),
                    
                  })),
                });
                console.log('Insert Order Items response:', response.data);
                alert('Order and order items successfully created.');
                await deleteCartItems();
                navigate('/');
              } catch (error) {
                console.error('Error inserting order items:', error);
                alert('Error inserting order items, please try again.');
              }
            } else {
              console.error('Order ID not found in response data');
              return; // Exit if order ID is missing
            }
          },
          prefill: {
            name: userData.first_name || 'Your Name',
            email: userData.email || 'your@example.com',
            contact: userData.mobile || '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Razorpay SDK not loaded.');
      }
    } catch (error) {
      console.error('Error in Razorpay payment:', error);
    }
  };
  useEffect(() => {
    // Log totalAmount when it changes
    console.log('Total Amount updated:', totalAmount);
  }, [totalAmount]);
  useEffect(() => {
    console.log('Cart Items updated:', cartItems); // Check cartItems state
  }, [cartItems]);

  return (
    <>
      <ToastContainer />
      <div className="page-content bg-light" style={{ paddingTop: "150px" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Checkout</h2>
          </div>
          <div className="cart-details">
            <div className="section-area account-wrapper" style={{ paddingTop: "150px" }}>
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
                            value={userData.first_name || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                            name="mobile"
                            value={userData.mobile || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={userData.email || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your address"
                            name="address1"
                            value={userData.address1 || ''}
                            readOnly
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
              <button onClick={handlePayment} className="btn btn-secondary">Proceed payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
