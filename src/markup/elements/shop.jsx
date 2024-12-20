import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

export default function Shop() {
  const [shop, setShop] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contactId, setContactId] = useState('');
  // const [basket, setBasket] = useState('');
  const [showGoToCart, setShowGoToCart] = useState(false);
  console.log('showGoToCart',showGoToCart)
  const navigate = useNavigate();

  useEffect(() => {
    getShop();

    // Check for logged-in status and retrieve contact_id
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.first_name) {
      setIsLoggedIn(true);
      setContactId(user.contact_id);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getShop = () => {
    api
      .get("/product/getShop")
      .then((res) => {
        setShop(res.data.data);
      })
      .catch(() => {});
  };

  const stripHtmlTags = (input) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleAddToCart = (item) => {

    console.log('item',item)
    if (!isLoggedIn) {
      alert("You must be logged in to add items to your cart.");
      return;
    }

    // Check if item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.product_id === item.product_id);
    console.log('existingItem',existingItem)
    if (existingItem) {
      alert("This item is already in your cart.");
      return;
    }

    const qty = 1;
    const unit_price = item.price;
    const product_id = item.product_id;

    api
      .post("/orders/insertbasketAddCart", {
        qty,
        unit_price,
        product_id,
        contact_id: contactId,
        added_to_cart_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .then(() => {
        setCart([...cart, { ...item, qty, unit_price }]);
        setShowGoToCart(true); // Show "Go to Cart" button
        alert("Item added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error.response ? error.response.data : error);
      });
  }; 

  const getBasket = () => {
    api
      .post("/orders/getBaskets", { contact_id: contactId })
      .then((res) => {
        setCart(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getBasket();
  }
  )

  return (
    <div className="page-content bg-white">

      <section className="section-area section-sp1">
        <div className="container">
          <h2>Shop</h2>
          <div className="row">
            {shop.map((data, index) => (
              <div className="col-lg-4 col-md-6 mb-30" key={index}>
                <div className="feature-container feature-bx2">
                  <div className="icon-xl">
                    <img
                      src={`https://homeservices.unitdtechnologies.com/storage/uploads/${data.file_name}`}
                      alt=""
                    />
                  </div>
                  <div className="icon-content">
                    <h3 className="ttr-title">{data.title}</h3>
                    <p>
                      {data.product_description
                        ? stripHtmlTags(data.product_description)
                        : ""}
                    </p>
                    <h5>Per Visit</h5>
                    <h6>Rs.{data.price}</h6>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAddToCart(data)}
                      disabled={cart.some(cartItem => cartItem.product_id === data.product_id)}
                    >
                      {cart.some(cartItem => cartItem.product_id === data.product_id)
                        ? "Already in Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={() => navigate("/add-cart")}>
                Go to Cart
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
