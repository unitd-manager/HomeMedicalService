import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';
import api from '../../constants/api';

// Images
import logo from '../../images/icon.png';
import logoWhite from '../../images/logo-white.png';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchFormOpen, setIsSearchBtn] = useState(false);
	const [activeItem, setActiveItem] = useState(null);
	const [isMobileView, setIsMobileView] = useState(false);
	const [menuItems, setMenuItems] = useState([]); // State to store menu items

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

	const handleMenuCloseClick = () => {
		setIsMenuOpen(false);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth >= 768);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const response = await api.get('/section/getWebsiteMenu');
				const { data } = response.data; // Accessing data from the response
				const formattedMenuItems = formatMenuItems(data); // Formatting data for rendering
				setMenuItems(formattedMenuItems);
			} catch (error) {
				console.error("Error fetching menu items:", error);
			}
		};

		fetchMenuItems();
	}, []);

	const formatMenuItems = (data) => {
		const menuMap = {};

		data.forEach(item => {
			const { section_title, category_title, category_id, internal_link, routes } = item;

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

	return (
		<header className="header header-transparent rs-nav">
			<Sticky enabled={true} className="sticky-header navbar-expand-lg">
				<div className="menu-bar clearfix">
					<div className="container-fluid clearfix">
					<div className="menu-logo logo-dark" style={{ textAlign: 'right', paddingRight: '40px' }}>
              <img src={logo} alt="lakshmimission" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
            </div>
						<button className={`navbar-toggler collapsed menuicon justify-content-end ${isMenuOpen ? 'open' : ''}`}
							type="button"
							onClick={toggleMenu}
							aria-label="Toggle navigation">
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
								<li className="num-bx"><a href="tel:+91 9000191112"><i className="fas fa-phone-alt"></i> +91 9000191112</a></li>
								<li className="btn-area"><Link to="/contact-us" className="btn btn-primary shadow">CONTACT US <i className="btn-icon-bx fas fa-chevron-right"></i></Link></li>
								<li className="btn-area" style={{marginLeft:"10px"}}><Link to="/form-register" className="btn btn-primary shadow">Register <i className="btn-icon-bx fas fa-chevron-right"></i></Link></li>

							</ul>
						</div>
						
						<div className={`menu-links navbar-collapse collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="menuDropdown">
							<div className="menu-logo">
								<Link to="/"><img src={logoWhite} alt="" /></Link>
							</div>
							
							<ul className="nav navbar-nav">	
								{menuItems.map((item) => (
									<li
										key={item.name}
										className={`${activeItem === item.name ? 'open' : ''}`}
										onClick={() => toggleSubmenu(item.name)}
									>
										{item.subItems.length ? (
											<Link to={item.linkName} onClick={handleMenuLinkClick}> {/* Link the section title */}
												{item.name}
												<i className={`fas fa-plus`}></i>
											</Link>
										) : (
											<Link to={item.linkName} onClick={handleMenuLinkClick}>
												{item.name}
											</Link>
										)}
										{(isMobileView || activeItem === item.name) && item.subItems.length > 0 && (
											<ul className="sub-menu">
												{item.subItems.map((subItem) => (
													<li key={subItem.id}>
														<Link to={subItem.linkName} onClick={handleMenuLinkClick}>
															<span>{subItem.displayName}</span>
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
							
							<div className="menu-close" onClick={handleMenuCloseClick}>
								<i className="ti-close"></i>
							</div>
							
						</div>
					</div>
				</div>
			</Sticky>
			
			<div className={`nav-search-bar ${isSearchFormOpen ? 'show' : ''}`}>
				<form>
					<input type="text" className="form-control" placeholder="Type to search" />
					<span><i className="ti-search"></i></span>
				</form>
				<span id="searchRemove" onClick={quikSearchClose}><i className="ti-close"></i></span>
			</div>
		</header>
	);
}

export default Header;
