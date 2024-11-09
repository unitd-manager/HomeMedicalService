import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../constants/api';

function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const contactId = user?.contact_id || null;
    console.log('Fetched contact_id from user object in localStorage:', contactId);

    const fetchCartItems = async () => {
      if (!contactId) {
        toast.error("User is not logged in or contact ID not found");
        return;
      }

      try {
        const response = await api.post(`/orders/getBasket`, { contact_id: contactId });
        console.log('API response data:', response.data);

        if (Array.isArray(response.data.data)) {
          setCartItems(response.data.data);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => 
      total + (item.unit_price * item.qty), 
    0);
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotalPrice() * 100; // Convert to paise for Razorpay

    if (totalAmount === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const response = await api.post('/orders/insertorders', { amount: totalAmount });
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: 'rzp_test_yE3jJN90A3ObCp',
        amount: amount.toString(),
        currency: currency,
        name: 'Your Company Name',
        description: 'Service Purchase',
        order_id: order_id,
        handler: function (response) {
          alert('Payment successful');
          console.log(response);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in payment processing:', error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page-content bg-light" style={{ paddingTop: "150px" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Payment Page</h2>
          </div>
          <div className="cart-details">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.basket_id} className="cart-item p-3 mb-3 bg-white rounded shadow-sm">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{item.unit_price}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Subtotal: ₹{item.unit_price * item.qty}</p>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <div className="total-price text-center mt-4">
              <h3>Total Price: ₹{calculateTotalPrice()}</h3>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/services" className="btn btn-secondary">Continue Browsing Services</Link>
              {cartItems.length > 0 && (
                <button onClick={handlePayment} className="btn btn-primary">Pay Now</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
