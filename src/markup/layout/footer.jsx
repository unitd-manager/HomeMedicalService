import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

class aboutSection extends Component{
	render(){
		return(
			<>
				
				<footer className="footer" style={{backgroundImage: "url("+footerBg+")"}}>
					<div className="footer-top">
						<div className="container">
							<div className="row">
								<div className="col-xl-3 col-lg-3 col-md-6">
									<div className="widget widget_info">
										<div className="footer-logo">
											<Link to="/"><img src={Logo} alt=""/></Link>
										</div>
										<div className="ft-contact">
											<div className="contact-bx">
												<div className="icon"><i className="fas fa-phone-alt"></i></div>
												<div className="contact-number">
													<span>Contact Us</span>
													<h4 className="number">+91 90001 91112</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-6">
									<div className="widget footer_widget ml-50">
										<h3 className="footer-title">Quick Links</h3>
										<ul>
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
											<li><Link to="/service-detail"><span>Category-2</span></Link></li>
											<li><Link to="/service-detail"><span>Category-3</span></Link></li>
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
													3/379, Devaki Sreenivasagam Complex,<br />
													Opp. Samy Ayya Nadar School,<br />
													Kadaikudi Road, Nagalapuram - 628 904.<br />
													Thoothukudi Dt.
												</span>
											</li>
											<li>
												<span>
													<a href="mailto:Imhpudhur@gmail.com">
														<i className="fas fa-envelope"></i> Imhpudhur@gmail.com
													</a>
												</span>
											</li>
											<li>
												<span>
													<a href="tel:+919000191112">
														<i className="fas fa-phone"></i> +91 90001 91112
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
									<p className="copyright-text">Copyright © 2023 Design & Developed by <a href="https://themeforest.net/user/themetrades" rel="noreferrer" target="_blank" className="text-secondary">ThemeTrades</a></p>
								</div>
							</div>
						</div>
					</div>
					<img className="pt-img1 animate-wave" src={ptImg1} alt=""/>
					<img className="pt-img2 animate1" src={ptImg2} alt=""/>
					<img className="pt-img3 animate-rotate" src={ptImg3} alt=""/>
					<img className="pt-img4 animate-wave" src={ptImg4} alt=""/>
				</footer>
			
			</>
		);
	}
}

export default aboutSection;