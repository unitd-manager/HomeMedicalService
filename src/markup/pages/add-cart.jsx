import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../constants/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate(); // Use navigate to programmatically navigate to the checkout page
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage
    const contactId = user ? user.contact_id : null; // Retrieve contact_id if user object is present
    console.log('Fetched contact_id from user object in localStorage:', contactId); // Log for debugging
  
    const fetchCartItems = async () => {
      if (!contactId) {
        toast.error("Contact ID not found");
        return;
      }
  
      try {
        const response = await api.post(`/orders/getBasket`, { contact_id: contactId });
        console.log('API response data:', response.data); // Log API response for debugging

        // Ensure the response contains the 'data' array and set the cartItems state
        if (Array.isArray(response.data.data)) {
          setCartItems(response.data.data); // Set cart items from 'data' key
        } else {
          setCartItems([]); // In case the 'data' key is not an array or is missing
        }
      } catch (error) {
        console.error("Error fetching cart items:", error); // Log any error encountered
        toast.error("Failed to fetch cart items");
      }
    };
  
    // Call fetchCartItems if contactId is available
    if (contactId) {
      fetchCartItems();
    }
  }, []); // Run only once on component mount

  // Handle quantity change
  const handleQtyChange = (id, qty) => {
    setCartItems(cartItems.map(item => 
      item.basket_id === id ? { ...item, qty: parseInt(qty, 10) || 1 } : item
    ));
  };

  // Delete item from the cart
  const DeleteCart = (cartId) => {
    api.post('/orders/deleteBasket', { basket_id: cartId })
      .then(() => 
       {
          setMessage("Item deleted successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 500);
          
        }
      )
      .catch((error) => {
        console.error("An error occurred while deleting the item:", error);
        setMessage("An error occurred while deleting the item."); // Set error message
      });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => 
      total + (item.unit_price * item.qty), 
    0);
  };

  // Update cart items using editBasket API before proceeding to checkout
  const handleProceedCheckout = async () => {
    try {
      const updatedCartItems = cartItems.map(item => ({
        basket_id: item.basket_id,
        qty: item.qty,
      }));
      
      // Sending the request
      console.log("Request Body:", { items: updatedCartItems });
      const response = await api.post('/orders/editBasket', { items: updatedCartItems });
        console.log("API Response:", response); // Log response to see if the backend is returning something useful

        if (response.status === 200) {
            toast.success("Cart updated successfully!");
            window.location.href = "#/checkout"; // Navigate to checkout
        } else {
          window.location.href = "#/checkout"; 
        }
    } catch (error) {
        console.error("Error while updating cart items:", error);
        window.location.href = "#/checkout"; 
    }
};



  return (
    <>
      <ToastContainer />
      <div className="page-content bg-light" style={{ paddingTop: "150px" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Service Cart</h2>
          </div>
          <div className="cart-details">
            {message && <div className="alert alert-info">{message}</div>} 
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.basket_id} className="cart-item position-relative p-3 mb-3 bg-white rounded shadow-sm">
                  <div className="service-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ marginRight: '10px' }}>{item.title}</h4>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => DeleteCart(item.basket_id)}
                    >
                      <i className="fas fa-trash" style={{ color: 'white' }}></i>
                    </button>
                  </div>
                  <p className="mb-2">Price: {item.unit_price}</p>
                  <div className="form-group d-flex align-items-center">
                    <label className="mr-2">Quantity:</label>
                    <input 
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item.basket_id, e.target.value)}
                      className="form-control" 
                      style={{ width: '80px', marginTop:'-8px' }} 
                      min="1"
                    />
                  </div>
                  <p>Subtotal: {item.unit_price * item.qty}</p>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <div className="total-price text-center mt-4">
              <h3>Total Price: {calculateTotalPrice()}</h3>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/services" className="btn btn-secondary">Continue Browsing Services</Link>
              <button onClick={handleProceedCheckout} className="btn btn-primary">Proceed Checkout</button>            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
