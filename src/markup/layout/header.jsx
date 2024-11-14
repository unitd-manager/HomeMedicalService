import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sticky from "react-stickynode";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import api from "../../constants/api";

// Images
import logo from "../../images/icon.png";
import logoWhite from "../../images/icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchBtn] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [cartItems, setCartItems] = useState([]);
const [cartCount, setCartCount] = useState(0); // New state for cart count

  const quikSearchBtn = () => setIsSearchBtn(!isSearchFormOpen);
  const quikSearchClose = () => setIsSearchBtn(false);

  const toggleSubmenu = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuLinkClick = () => {
    if (window.innerWidth <= 991) {
      setIsMenuOpen(false);
    }
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleMenuCloseClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get("/section/getWebsiteMenu");
        const { data } = response.data; // Accessing data from the response
        const formattedMenuItems = formatMenuItems(data); // Formatting data for rendering
        setMenuItems(formattedMenuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const contactId = localStorage.getItem("contact_id"); // Check for contact_id
  
    // Update the state based on user info
    if (user && user.first_name) {
      setFirstName(user.first_name);
      setIsLoggedIn(true); // Set isLoggedIn to true if user is found
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if no user found
    }
  }, []); // Fetch this only on mount 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.contact_id) {
      api
        .post("/contact/getCartProductsByContactId", { contact_id: user.contact_id })
        .then((res) => {
          setCartItems(res.data.data);
          setCartCount(res.data.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
        
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("contact_id");
    setFirstName(null);
    setIsLoggedIn(false);
    toggleProfileDropdown();
    window.location.reload(); // Refresh the page to update the UI
  };

  const formatMenuItems = (data) => {
    const menuMap = {};

    data.forEach((item) => {
      const {
        section_title,
        category_title,
        category_id,
        internal_link,
        routes,
      } = item;

      if (!menuMap[section_title]) {
        menuMap[section_title] = {
          name: section_title,
          linkName: `/${routes}`, // Use the routes field from the API
          subItems: [],
        };
      }

      if (category_title) {
        menuMap[section_title].subItems.push({
          id: category_id,
          displayName: category_title,
          linkName: `/${internal_link}`, // Adjust linkName as needed
        });
      }
    });

    return Object.values(menuMap);
  };
   const renderProfileDropdown = () => (
    <ul className="profile-dropdown" style={{
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "#fff",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      listStyleType: "none",
      padding: "10px",
      minWidth: "150px",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
    }}>
      {isLoggedIn ? (
        <>
          <li style={{ padding: "8px 12px", cursor: "pointer" }}>
            <Link
              to="/my-account"
              onClick={toggleProfileDropdown}
              style={{ textDecoration: "none", color: "black", display: "block", width: "100%" }}
            >
              Profile
            </Link>
          </li>
          <li style={{ padding: "8px 12px", cursor: "pointer" }}>
            <Link
              to="/logout"
              onClick={handleLogout}
              style={{ textDecoration: "none", color: "black", display: "block", width: "100%" }}
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li style={{ padding: "8px 12px", cursor: "pointer" }}>
            <Link
              to="/form-login"
              onClick={toggleProfileDropdown}
              style={{ textDecoration: "none", color: "black", display: "block", width: "100%" }}
            >
              Login
            </Link>
          </li>
          <li style={{ padding: "8px 12px", cursor: "pointer" }}>
            <Link
              to="/form-register"
              onClick={toggleProfileDropdown}
              style={{ textDecoration: "none", color: "black", display: "block", width: "100%" }}
            >
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="header header-transparent rs-nav">
      {firstName && (
        <div
          className="welcome-message"
          style={{
            textAlign: "right",
            padding: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h5>Welcome, {firstName}!</h5>
        </div>
      )}
      <Sticky enabled={true} className="sticky-header navbar-expand-lg">
        <div className="menu-bar clearfix">
          <div className="container-fluid clearfix">
            <div
              className="menu-logo logo-dark"
              style={{ textAlign: "right", paddingRight: "40px" }}
            >
              <img
                src={logo}
                alt="lakshmimission"
                style={{ width: "100px", height: "auto", marginTop: "10px" }}
              />
            </div>
            <button
              className={`navbar-toggler collapsed menuicon justify-content-end ${
                isMenuOpen ? "open" : ""
              }`}
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="secondary-menu">
              <ul>
                <li className="search-btn">
                  <button
                    id="quikSearchBtn"
                    type="button"
                    className="btn-link"
                    onClick={quikSearchBtn}
                  >
                    <i className="las la-search"></i>
                  </button>
                </li>
                <li className="num-bx">
                  <a href="tel:+91 9000191112">
                    <i className="fas fa-phone-alt"></i> +91 9000191112
                  </a>
                </li>
                <li className="num-bx">
  <Link to="/add-cart">
    <FaShoppingCart />
    {cartCount > 0 && (
      <span className="cart-count">{cartCount}</span> // Display the count
    )}
  </Link>
</li>
                <li className="profile-icon" onClick={toggleProfileDropdown} style={{ cursor: "pointer", position: "relative", paddingRight:'10px' }}>
                  <FaUser />
                  {isProfileDropdownOpen && renderProfileDropdown()}
                </li>

                {/* <li className="btn-area">
                  <Link to="/contact-us" className="btn btn-primary shadow">
                    CONTACT US{" "}
                    <i className="btn-icon-bx fas fa-chevron-right"></i>
                  </Link>
                </li> */}
              </ul>
            </div>

            <div
              className={`menu-links navbar-collapse collapse justify-content-end ${
                isMenuOpen ? "show" : ""
              }`}
              id="menuDropdown"
            >
              <div className="menu-logo">
                <Link to="/">
                  <img src={logoWhite} alt="" />
                </Link>
              </div>

              <ul className="nav navbar-nav">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`${activeItem === item.name ? "open" : ""}`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.subItems.length ? (
                      <Link to={item.linkName} onClick={handleMenuLinkClick}>
                        {" "}
                        {/* Link the section title */}
                        {item.name}
                        <i className={`fas fa-plus`}></i>
                      </Link>
                    ) : (
                      <Link to={item.linkName} onClick={handleMenuLinkClick}>
                        {item.name}
                      </Link>
                    )}
                    {(isMobileView || activeItem === item.name) &&
                      item.subItems.length > 0 && (
                        <ul className="sub-menu">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                to={subItem.linkName}
                                onClick={handleMenuLinkClick}
                              >
                                <span>{subItem.displayName}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>

              <div className="menu-close" onClick={handleMenuCloseClick}>
                <i className="ti-close"></i>
              </div>
            </div>
          </div>
        </div>
      </Sticky>

      <div className={`nav-search-bar ${isSearchFormOpen ? "show" : ""}`}>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Type to search"
          />
          <span>
            <i className="ti-search"></i>
          </span>
        </form>
        <span id="searchRemove" onClick={quikSearchClose}>
          <i className="ti-close"></i>
        </span>
      </div>
    </header>
  );
};

export default Header;
