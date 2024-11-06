import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [contactId, setContactId] = useState(''); // State to store contact_id

  useEffect(() => {
    getShop();
    
    // Check for logged in status and retrieve contact_id
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.first_name) {
      setIsLoggedIn(true);
      setContactId(user.contact_id); // Set the contact_id if user is logged in
    //   console.log("contactId set in state:", contact_id); // Log to confirm it's set
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
    if (!isLoggedIn) {
      alert("You must be logged in to add items to your cart.");
      return; // Stop execution if the user is not logged in
    }

    const qty = 1; // Default quantity set to 1
    const unit_price = item.price;
    const product_id = item.product_id;

    setCart([...cart, { ...item, qty, unit_price }]);
    console.log("Added to Cart:", item);
    
    // Log contactId right before the API call
    // console.log("contactId before API call:", contactId); // Ensure this shows the expected value

    // // Convert contactId to number if necessary
	// const contactIdNumber = localStorage.getItem("contact_id");

    api
      .post("/orders/insertbasketAddCart", {
        qty: qty,
        unit_price: unit_price,
        product_id: product_id,
        contact_id: contactId, // Use the converted contact_id
        added_to_cart_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        // order_type: "example_order_type",
        // category_type: "example_category_type",
        // delivery_address: "example_address", // Replace with actual address if needed
      })
      .then((response) => {
        console.log("Item added to cart successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error.response ? error.response.data : error);
      });
  };

  return (
    <div className="page-content bg-white">
      <div className="banner-wraper">
        <div
          className="page-banner"
          style={{ backgroundImage: "url(" + bnrImg1 + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Services</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>{" "}
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Services
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <img className="pt-img1 animate-wave" src={waveBlue} alt="" />
          <img className="pt-img2 animate2" src={circleDots} alt="" />
          <img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
        </div>
      </div>

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
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
