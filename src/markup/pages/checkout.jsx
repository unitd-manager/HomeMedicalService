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
  const [paymentMethod, setPaymentMethod] = useState(''); // State for selected payment method
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const contactId = user ? user.contact_id : null;

    // Fetch cart items and calculate total amount
    const fetchCartItems = async () => {
      if (!contactId) return;

      try {
        const response = await api.post(`/orders/getBaskets`, { contact_id: contactId });
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const items = response.data.data;
          setCartItems(items);

          // Calculate total amount
          const total = items.reduce((sum, item) => {
            const qty = parseFloat(item.qty) || 0;
            const unit_price = parseFloat(item.unit_price) || 0;
            return sum + (qty * unit_price);
          }, 0);
          setTotalAmount(total);
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
        setCartItems([]); // Clear cart items from state
      }
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'Cash on Delivery') {
      try {
        // Insert order with "due" status
        const orderResponse = await api.post('/orders/insertorders', {
          contact_id: userData.contact_id,
          shipping_email: userData.email,
          shipping_phone: userData.mobile,
          shipping_address1: userData.address1,
          order_status: 'due', // Set status as due
          payment_method: 'Cash on Delivery', // Set payment method
        });
        
        const orderId = orderResponse.data.data.insertId;
        if (orderId) {
          await api.post('/orders/insertOrderItems', {
            order_id: orderId,
            items: cartItems.map(item => ({
              product_id: item.product_id,
              qty: parseFloat(item.qty),
              unit_price: parseFloat(item.unit_price),
            })),
          });
          await deleteCartItems();
          navigate('/');
        }
      } catch (error) {
        console.error('Error processing Cash on Delivery order:', error);
      }
    } else if (paymentMethod === 'Razorpay') {
      try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
          alert('Failed to load Razorpay script');
          return;
        }

        const totalAmountInPaise = totalAmount * 100;

        const options = {
          key: 'rzp_test_yE3jJN90A3ObCp',
          amount: totalAmountInPaise,
          currency: 'INR',
          name: userData.first_name,
          description: 'Test Transaction',
          handler: async function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);

            const orderResponse = await api.post('/orders/insertorders', {
              contact_id: userData.contact_id,
              shipping_email: userData.email,
              shipping_phone: userData.mobile,
              shipping_address1: userData.address1,
              order_status: 'paid', // Set status as paid
              payment_method: 'Razorpay', // Set payment method
            });

            const orderId = orderResponse.data.data.insertId;
            if (orderId) {
              await api.post('/orders/insertOrderItems', {
                order_id: orderId,
                items: cartItems.map(item => ({
                  product_id: item.product_id,
                  qty: parseFloat(item.qty),
                  unit_price: parseFloat(item.unit_price),
                })),
              });
              await deleteCartItems();
              navigate('/');
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
      } catch (error) {
        console.error('Error in Razorpay payment:', error);
      }
    }
  };

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
                            value={userData.first_name || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.mobile || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={userData.email || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.address1 || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Payment Method</label>
                          <select
                            className="form-control"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option value="">Select Payment Method</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="Razorpay">Razorpay</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/add-cart" className="btn btn-secondary">Back to Cart</Link>
              <button onClick={handlePayment} className="btn btn-secondary" disabled={!paymentMethod}>
                Proceed payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
