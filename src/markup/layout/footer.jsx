import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../src/constants/api';

// Images
import Logo from '../../images/icon.png';
import footerBg from '../../images/background/footer.jpg';
import ptImg1 from '../../images/shap/wave-blue.png';
import ptImg2 from '../../images/shap/circle-dots.png';
import ptImg3 from '../../images/shap/plus-blue.png';
import ptImg4 from '../../images/shap/wave-blue.png';

// Social Images
import facebook from '../../images/social/facebook.png';
import twitter from '../../images/social/twitter.png';
import instagram from '../../images/social/instagram.png';
import linkedin from '../../images/social/linkedin.png';

export default function Footer() {
	// const [menus, setMenus] = useState([]);
	const [email, setEmail] = useState({});
	const [companyName, setCompanyName] = useState('');
	const [address, setAddress] = useState({});
	const [contact, setContact] = useState({});

	useEffect(() => {
		// getBlogs();
		getAddress();
		getCompanyName();
		getMobile();
		getEmail();
		window.scrollTo(0, 0);
	}, []);

	// const getBlogs = async () => {
	// 	try {
	// 		const res = await api.get('/section/getWebsiteMenu');
	// 		const loopData = res.data.data;
	// 		const result = loopData.reduce((r, a) => {
	// 			r[a.section_title] = r[a.section_title] || [];
	// 			r[a.section_title].push(a);
	// 			return r;
	// 		}, {});

	// 		const menuArray = Object.keys(result).map(key => ({
	// 			section_title: key,
	// 			value: result[key],
	// 		}));

	// 		console.log("Fetched Menus:", menuArray); // Check structure here
	// 		setMenus(menuArray);
	// 	} catch (error) {
	// 		console.error("Error fetching menu data:", error);
	// 	}
	// };

	const getEmail = async () => {
		try {
			const res = await api.get('/setting/getEmail');
			setEmail(res.data.data[0]);
		} catch (error) {
			console.error("Error fetching email:", error);
		}
	};

	const getCompanyName = async () => {
		try {
			const res = await api.get('/setting/getCompanyName');
			setCompanyName(res.data.data[0]);
		} catch (error) {
			console.error("Error fetching company name:", error);
		}
	};

	const getAddress = async () => {
		try {
			const res = await api.get('/setting/getAddress');
			setAddress(res.data.data[0]);
		} catch (error) {
			console.error("Error fetching address:", error);
		}
	};

	const getMobile = async () => {
		try {
			const res = await api.get('/setting/getContacts');
			setContact(res.data.data[0]);
		} catch (error) {
			console.error("Error fetching contact:", error);
		}
	};

	return (
		<footer className="footer" style={{ backgroundImage: `url(${footerBg})` }}>
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-lg-3 col-md-6">
							<div className="widget widget_info">
								<div className="footer-logo">
									<Link to="/"><img src={Logo} alt="Logo" /></Link>
								</div>
								<div className="ft-contact">
									<div className="contact-bx">
										<div className="icon"><i className="fas fa-phone-alt"></i></div>
										<div className="contact-number">
											<span>Contact Us</span>
											<h4 className="number">{contact.phone}</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-6">
							<div className="widget footer_widget ml-50">
								<h3 className="footer-title">Quick Links</h3>
								<ul>
									{/* {menus.map((data, index) => (
										<li key={index}>
											<Link to={`/${data.value[0].seo_title || data.section_title}`} className="nav-link text-light">
												{data.section_title}
											</Link>
										</li>
									))} */}
																		<li><Link to="/Home"><span>Home</span></Link></li>
									<li><Link to="/about-us"><span>About Us</span></Link></li>
									<li><Link to="/services"><span>Services</span></Link></li>
									<li><Link to="/blog-grid"><span>Blogs</span></Link></li>
									<li><Link to="/team"><span>Our Team</span></Link></li>
								</ul>
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-6">
							<div className="widget footer_widget">
								<h3 className="footer-title">Our Service</h3>
								<ul>
									<li><Link to="/service-detail"><span>Category-1</span></Link></li>
									<li><Link to="/service-detail1"><span>Category-2</span></Link></li>
									<li><Link to="/service-detail2"><span>Category-3</span></Link></li>
								</ul>
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-md-6">
							<div className="widget widget_form">
								<h3 className="footer-title">Contact Us</h3>
								<ul>
									<li>
										<span>
											<i className="fas fa-map-marker-alt"></i>
											{address.address}
										</span>
									</li>
									<li>
										<span>
											<a href={`mailto:${email.mailId}`}>
												<i className="fas fa-envelope"></i> {email.mailId}
											</a>
										</span>
									</li>
									<li>
										<span>
											<a href={`tel:${contact.phone}`}>
												<i className="fas fa-phone"></i> {contact.phone}
											</a>
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="footer-bottom">
					<div className="row">
						<div className="col-12 text-center">
							<p className="copyright-text">Copyright © 2024 Design & Developed by <a href="https://unitdtechnologies.com/" rel="noreferrer" target="_blank" className="text-secondary">UTS</a></p>
						</div>
					</div>
				</div>
			</div>
			<img className="pt-img1 animate-wave" src={ptImg1} alt="Decoration 1" />
			<img className="pt-img2 animate1" src={ptImg2} alt="Decoration 2" />
			<img className="pt-img3 animate-rotate" src={ptImg3} alt="Decoration 3" />
			<img className="pt-img4 animate-wave" src={ptImg4} alt="Decoration 4" />
		</footer>
	);
}
