import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';
import api from '../../../src/constants/api';

// Images
import logo from '../../images/icon.png';
import logoWhite from '../../images/logo-white.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchBtn] = useState(false);
  const quikSearchBtn = () => setIsSearchBtn(!isSearchFormOpen);
  const quikSearchClose = () => setIsSearchBtn(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [section, setSection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getMenu = () => {
    api
      .get('/section/getWebsiteMenu')
      .then((res) => {
        setSection(res.data.data); // Assuming your data structure is correct
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };

  const getCategories = () => {
    api
      .get('/section/getWebsiteSideMenu') // Ensure this endpoint is correct
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleMenuLinkClick = (title) => {
    setActiveItem(title);
    if (title === 'Services') {
      setIsDropdownOpen((prev) => !prev);
      getCategories();
    } else {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header header-transparent rs-nav">
      <Sticky enabled={true} className="sticky-header navbar-expand-lg">
        <div className="menu-bar clearfix">
          <div className="container-fluid clearfix">
            <div className="menu-logo logo-dark" style={{ textAlign: 'right', paddingRight: '40px' }}>
              <img src={logo} alt="lakshmimission" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
            </div>
            <button
              className={`navbar-toggler collapsed menuicon justify-content-end ${isMenuOpen ? 'open' : ''}`}
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="secondary-menu">
              <ul>
                <li className="search-btn">
                  <button id="quikSearchBtn" type="button" className="btn-link" onClick={quikSearchBtn}>
                    <i className="las la-search"></i>
                  </button>
                </li>
                <li className="num-bx">
                  <a href="Mob No:+91 90001 91112">
                    <i className="fas fa-phone-alt"></i> +91 90001 91112
                  </a>
                </li>
                <li className="btn-area">
                  <Link to="/contact-us" className="btn btn-primary shadow">CONTACT US <i className="btn-icon-bx fas fa-chevron-right"></i></Link>
                </li>
                <li className="btn-area" style={{ paddingLeft: '15px' }}>
                  <Link to="/form-register" className="btn btn-primary shadow">Register <i className="btn-icon-bx fas fa-chevron-right"></i></Link>
                </li>
              </ul>
            </div>

            <div className={`menu-links navbar-collapse collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="menuDropdown">
              <div className="menu-logo">
                <Link to="/"><img src={logoWhite} alt=""/></Link>
              </div>
              <ul className="nav navbar-nav">
                {section.map((item) => (
                  <li
                    key={item.id}
                    className={`${activeItem === item.section_title ? 'open' : ''}`}
                    onClick={() => handleMenuLinkClick(item.section_title)}
                  >
                    <Link to={`/${item.routes}`}>
                      {item.section_title}
                    </Link>

                    {item.section_title === 'Services' && isDropdownOpen && (
                      <ul className="dropdown">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link to={`/${category.internal_link}`}>
                              <span>{category.category_title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <ul className="social-media">
                <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="btn btn-primary"><i className="fab fa-facebook-f"></i></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.google.com/" className="btn btn-primary"><i className="fab fa-google"></i></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/" className="btn btn-primary"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://twitter.com/" className="btn btn-primary"><i className="fab fa-twitter"></i></a></li>
              </ul>

              <div className="menu-close" onClick={() => setIsMenuOpen(false)}>
                <i className="ti-close"></i>
              </div>
            </div>
          </div>
        </div>
      </Sticky>

      <div className={`nav-search-bar ${isSearchFormOpen ? 'show' : ''}`}>
        <form>
          <input type="text" className="form-control" placeholder="Type to search"/>
          <span><i className="ti-search"></i></span>
        </form>
        <span id="searchRemove" onClick={quikSearchClose}><i className="ti-close"></i></span>
      </div>
    </header>
  );
};

export default Header;
